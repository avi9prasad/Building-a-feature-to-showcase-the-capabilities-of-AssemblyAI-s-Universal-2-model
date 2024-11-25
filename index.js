const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

const API_KEY = process.env.ASSEMBLYAI_API_KEY; 

async function transcribeAudio() {
  try {
    // Step 1: Upload the audio file
    const uploadResponse = await axios.post(
      'https://api.assemblyai.com/v2/upload',
      fs.createReadStream(AUDIO_FILE_PATH),
      { headers: { authorization: API_KEY } }
    );
    console.log('Audio uploaded:', uploadResponse.data);

    const transcriptResponse = await axios.post(
      'https://api.assemblyai.com/v2/transcript',
      {
        audio_url: uploadResponse.data.upload_url,
        speaker_labels: true, 
        auto_chapters: true, 
      },
      { headers: { authorization: API_KEY } }
    );
    console.log('Transcription started:', transcriptResponse.data);

    
    let transcript = null;
    while (!transcript || transcript.status !== 'completed') {
      const pollingResponse = await axios.get(
        `https://api.assemblyai.com/v2/transcript/${transcriptResponse.data.id}`,
        { headers: { authorization: API_KEY } }
      );
      transcript = pollingResponse.data;
      console.log('Transcription status:', transcript.status);

      if (transcript.status === 'completed') break;

      
      await new Promise(resolve => setTimeout(resolve, 5000));
    }

    
    fs.writeFileSync('transcription_result.json', JSON.stringify(transcript, null, 2));
    console.log('Transcription completed! Results saved to transcription_result.json.');
  } catch (error) {
    console.error('Error:', error);
  }
}

transcribeAudio();
