import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';

interface RealtimeChatProps {
  onMessage: (message: any) => void;
  generatedContent?: string;
}

const RealtimeChat: React.FC<RealtimeChatProps> = ({ onMessage, generatedContent = '' }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const dataChannel = useRef<RTCDataChannel | null>(null);
  const audioElement = useRef<HTMLAudioElement | null>(null);

  const stopConnection = () => {
    console.log("Stopping WebRTC connection...");
    if (dataChannel.current) {
      dataChannel.current.close();
    }
    if (peerConnection.current) {
      peerConnection.current.close();
    }
    setIsConnected(false);
    setError(null);
  };

  const initWebRTC = async () => {
    try {
      setError(null);
      setIsConnected(false);
      setIsConnecting(true);
      
      console.log("Initializing WebRTC connection...");

      // Create a welcome message
      const welcomeMessage = {
        type: 'chat',
        content: `Olá! Sou seu assistente especializado em SRA (Sistema Reticular Ativador). 
                 Posso ajudar você a entender e aplicar os conceitos do SRA no seu desenvolvimento pessoal e educação.
                 Você pode me perguntar sobre:
                 - Práticas de desenvolvimento pessoal usando o SRA
                 - Como aplicar o SRA na educação
                 - Dicas práticas e exercícios
                 - Cronogramas e planejamento
                 Como posso ajudar você hoje?`
      };
      
      if (onMessage) {
        onMessage(welcomeMessage);
      }

      // Get ephemeral token from our backend
      const tokenResponse = await fetch('/api/realtime/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          generated_content: generatedContent
        })
      });
      
      if (!tokenResponse.ok) {
        const errorText = await tokenResponse.text();
        console.error('Session response:', errorText);
        throw new Error(`Failed to get session token: ${tokenResponse.status} ${tokenResponse.statusText}`);
      }

      let data;
      try {
        data = await tokenResponse.json();
        console.log("Received session data:", data);
      } catch (e) {
        console.error('Failed to parse session response:', e);
        throw new Error('Invalid response from server');
      }
      
      if (data.error) {
        throw new Error(data.error);
      }

      if (!data.session?.client_secret?.value) {
        console.error('Invalid session data:', data);
        throw new Error('Invalid session response format');
      }

      const EPHEMERAL_KEY = data.session.client_secret.value;

      // Create peer connection with specific configuration
      const configuration: RTCConfiguration = {
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' }
        ],
        bundlePolicy: 'max-bundle'
      };

      peerConnection.current = new RTCPeerConnection(configuration);

      // Set up audio element for remote audio
      audioElement.current = new Audio();
      audioElement.current.autoplay = true;

      // Handle remote audio stream
      peerConnection.current.ontrack = (event) => {
        console.log("Received remote track:", event.track.kind);
        if (audioElement.current) {
          audioElement.current.srcObject = event.streams[0];
        }
      };

      // Handle connection state changes
      peerConnection.current.onconnectionstatechange = () => {
        if (peerConnection.current) {
          const state = peerConnection.current.connectionState;
          console.log("Connection state changed:", state);
          setIsConnected(state === 'connected');
        }
      };

      // Add audio transceiver first
      console.log("Adding audio transceiver...");
      const audioTransceiver = peerConnection.current.addTransceiver('audio', {
        direction: 'sendrecv',
        streams: [new MediaStream()]
      });

      // Create data channel second
      console.log("Creating data channel...");
      dataChannel.current = peerConnection.current.createDataChannel('oai-events', {
        ordered: true
      });

      dataChannel.current.onopen = () => {
        console.log("Data channel opened");
      };

      dataChannel.current.onmessage = (event) => {
        try {
          const realtimeEvent = JSON.parse(event.data);
          onMessage(realtimeEvent);
        } catch (err) {
          console.error('Failed to parse message:', err);
        }
      };

      // Add local audio track to the transceiver
      try {
        console.log("Getting user media...");
        const stream = await navigator.mediaDevices.getUserMedia({ 
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true
          }
        });
        
        console.log("Adding local audio track...");
        const audioTrack = stream.getAudioTracks()[0];
        audioTransceiver.sender.replaceTrack(audioTrack);
      } catch (err) {
        console.error('Failed to get user media:', err);
        setError('Microphone access denied');
        return;
      }

      // Create offer
      console.log("Creating offer...");
      const offer = await peerConnection.current.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: false
      });

      console.log("Setting local description...");
      await peerConnection.current.setLocalDescription(offer);

      // Send offer to OpenAI's server
      console.log("Sending SDP offer to server...");
      const sdpResponse = await fetch(`https://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-12-17`, {
        method: 'POST',
        body: offer.sdp,
        headers: {
          Authorization: `Bearer ${EPHEMERAL_KEY}`,
          'Content-Type': 'application/sdp',
        },
      });

      if (!sdpResponse.ok) {
        const errorText = await sdpResponse.text();
        console.error('SDP response error:', errorText);
        throw new Error('Failed to get SDP answer');
      }

      const answerSdp = await sdpResponse.text();
      console.log("Received SDP answer from server:", answerSdp);

      if (peerConnection.current.signalingState === 'closed') {
        throw new Error('PeerConnection is closed');
      }

      const answer = {
        type: 'answer' as RTCSdpType,
        sdp: answerSdp
      };

      console.log("Setting remote description...");
      await peerConnection.current.setRemoteDescription(answer);
      console.log("WebRTC connection setup complete");
      setIsConnecting(false);

    } catch (err) {
      console.error('WebRTC initialization failed:', err);
      setError(err instanceof Error ? err.message : 'Failed to initialize WebRTC');
      setIsConnecting(false);
      if (peerConnection.current) {
        peerConnection.current.close();
      }
    }
  };

  const sendMessage = (message: any) => {
    if (dataChannel.current?.readyState === 'open') {
      dataChannel.current.send(JSON.stringify(message));
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopConnection();
    };
  }, []);

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: 2,
      p: 2,
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 1
    }}>
      <Typography variant="h6" component="div">
        Voice Chat
      </Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {!isConnected && !isConnecting && (
          <Button
            variant="contained"
            color="primary"
            onClick={initWebRTC}
            disabled={isConnecting}
            sx={{ minWidth: '140px' }}
          >
            Start Voice Chat
          </Button>
        )}

        {isConnecting && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CircularProgress size={20} />
            <Typography>Connecting...</Typography>
          </Box>
        )}

        {isConnected && (
          <Button
            variant="contained"
            color="error"
            onClick={stopConnection}
            sx={{ minWidth: '140px' }}
          >
            Stop Voice Chat
          </Button>
        )}

        <Typography 
          sx={{ 
            ml: 2,
            color: isConnected ? 'success.main' : error ? 'error.main' : 'text.secondary',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <Box
            component="span"
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: isConnected ? 'success.main' : error ? 'error.main' : 'text.disabled',
              display: 'inline-block'
            }}
          />
          {isConnected ? 'Connected' : error ? error : 'Not connected'}
        </Typography>
      </Box>
    </Box>
  );
};

export default RealtimeChat;
