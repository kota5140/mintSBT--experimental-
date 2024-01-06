import { useState, useEffect } from 'react';
import pinJsonToIPFS from '../src/js/pinJsonToIPFS'; // Add this import

type UseGetJsonVCUrlProps = {
    string: string | null; // Add jsonData to the props
};

export const useGetJsonVCUrl = ({ string }: UseGetJsonVCUrlProps) => {
    const [jsonVCUrl, setJsonVCUrl] = useState<string | null>(null); // Add jsonUrl state
    useEffect(() => {
        const pinDataToIPFS = async () => {
            if (string) {
                try {
                    // Pin the JSON data to IPFS and get the link
                    const jsonIpfsLink = await pinJsonToIPFS(string);
                    setJsonVCUrl('https://ipfs.io/ipfs/' + jsonIpfsLink);
                } catch (error) {
                    console.error('Error pinning JSON data to IPFS:', error);
                }
            } else {
                setJsonVCUrl(null);
            }
        };

        pinDataToIPFS();
    }, [string]);
    console.log(jsonVCUrl);

    return { jsonVCUrl };
};