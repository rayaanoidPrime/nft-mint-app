import { Button, Text, HStack, useStatStyles, VStack, Container, Heading, Image } from "@chakra-ui/react";
import { MouseEventHandler, useCallback, useEffect, useMemo, useState } from "react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { NextPage } from "next";
import { PublicKey } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js";
import MainLayout from "../components/MainLayout";

interface NewMintProps {
    mint: PublicKey
}

const NewMint: NextPage<NewMintProps> = ({ mint }) => {

    const [metaData, setMetaData] = useState<any>();
    const { connection } = useConnection();
    const wallet = useWallet();
    const metaplex = useMemo(() => {
        return Metaplex.make(connection).use(walletAdapterIdentity(wallet))
    }, [connection, wallet]);

    useEffect(() => {
        metaplex.nfts().findByMint({ mintAddress: new PublicKey(mint) })
            .then((nft) => {
                fetch(nft.uri).then((res) => res.json()).then((metadata) => {
                    setMetaData(metadata);
                })
            })
    }, [mint, metaplex, wallet]);


    const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
        async (event) => { },
        []
    );

    return (
        <MainLayout>
            <VStack spacing={20}>
                <Container>
                    <VStack spacing={8}>
                        <Heading color="white" as="h1" size="2xl" textAlign="center">
                            😮 A new buildoor has appeared!
                        </Heading>

                        <Text color="grey" fontSize="xl" textAlign="center">
                            Congratulations, you minted a lvl 1 buildoor! <br />
                            Time to stake your character to earn rewards and level up.
                        </Text>
                    </VStack>
                </Container>

                <Image src={metaData?.image ?? ""} alt="" />

                <Button
                    bgColor="darkviolet"
                    color="white"
                    maxW="380px"
                    onClick={handleClick}
                >
                    <HStack>
                        <Text>stake my buildoor</Text>
                        <ArrowForwardIcon />
                    </HStack>
                </Button>
            </VStack>
        </MainLayout>
    )
};

NewMint.getInitialProps = async ({ query }) => {
    const { mint } = query;
    if (!mint) throw { error: "no mint" };

    try {
        const mintPubkey = new PublicKey(mint);
        return { mint: mintPubkey }
    } catch {
        throw { error: "invalid mint" }
    }
}

export default NewMint;