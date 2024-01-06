// src/js/pinJsonToIPFS.ts
import axios from 'axios';
import FormData from 'form-data';
/* 隠す必要アリ */
const JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIzYTAwZDBhMy1kYTk0LTQ0NjAtYjI3Ni0zNDE3OTM1YTcyNzQiLCJlbWFpbCI6ImtoODQwMTIzNEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiZjAzNjVkOTNkNGI1YjM3NDg0MzQiLCJzY29wZWRLZXlTZWNyZXQiOiJiMjkwYTU5ZGI0YTBlZmQ1OTg2NGI1ZjU2NmUyNmEyMzc4ZGMyNzRiYzMzYzQwZjVmZmM5OTkxNWUyNDgzYWU0IiwiaWF0IjoxNzA0NTE4ODgyfQ.XX4oRTvE9N5o6-ALxVCLao5ONcCngYFFyMHHMfTIW4M';

const pinJsonToIPFS = async (jsonData) => {
    const formData = new FormData();
    const jsonBlob = new Blob([JSON.stringify(jsonData)], { type: 'application/json' });

    formData.append('file', jsonBlob);

    const pinataMetadata = JSON.stringify({
        name: 'jsonFile.json',  // 適切なファイル名に変更する必要があります
    });
    formData.append('pinataMetadata', pinataMetadata);

    const pinataOptions = JSON.stringify({
        cidVersion: 0,
    });
    formData.append('pinataOptions', pinataOptions);

    try {
        const response = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
            maxBodyLength: "Infinity",
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                'Authorization': `Bearer ${JWT}`
            }
        });

        return response.data.IpfsHash; // 仮に 'IpfsHash' が正しいプロパティであると仮定しています。実際のレスポンスを確認してください
    } catch (error) {
        console.error('Error pinning JSON data to IPFS:', error);
        throw error;
    }
};

export default pinJsonToIPFS;