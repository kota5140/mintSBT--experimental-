import { useState, useEffect } from 'react';
import pinJsonToIPFS from '../src/js/pinJsonToIPFS'; // Add this import

type UseGetJsonUrlProps = {
    string: string | null; // Add jsonData to the props
};

export const useGetJsonUrl = ({ string }: UseGetJsonUrlProps) => {
    const [jsonUrl, setJsonUrl] = useState<string | null>(null); // Add jsonUrl state
    useEffect(() => {
        const pinDataToIPFS = async () => {
            if (string) {
                try {
                    // Pin the JSON data to IPFS and get the link
                    const jsonIpfsLink = await pinJsonToIPFS(string);
                    setJsonUrl('https://ipfs.io/ipfs/' + jsonIpfsLink);
                } catch (error) {
                    console.error('Error pinning JSON data to IPFS:', error);
                }
            } else {
                setJsonUrl(null);
            }
        };

        pinDataToIPFS();
    }, [string]);
    //console.log(jsonUrl);

    return { jsonUrl };
};