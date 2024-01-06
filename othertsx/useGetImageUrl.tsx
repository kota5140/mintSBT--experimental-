// useGetImageUrl.ts
import { useState, useEffect } from 'react';
import pinFileToIPFS from '../src/js/pintoipfs'; // このパスは実際のファイルのパスに変更してください

type UseGetImageUrlProps = {
    file: File | null;
};

export const useGetImageUrl = ({ file }: UseGetImageUrlProps) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        const pinImageToIPFS = async () => {
            if (file) {
                try {
                    // ファイルをIPFSにアップロードし、リンクを取得
                    const ipfsLink = await pinFileToIPFS(file);
                    setImageUrl('https://ipfs.io/ipfs/' + ipfsLink);
                } catch (error) {
                    console.error('Error pinning image to IPFS:', error);
                }
            } else {
                setImageUrl(null);
            }
        };

        pinImageToIPFS();
    }, [file]);
    console.log(imageUrl);

    return { imageUrl };
};