import { FC, MouseEventHandler, useCallback, useEffect, useMemo, useState } from "react"
import {
    Button,
    Container,
    Heading,
    HStack,
    Text,
    VStack,
    Image,
} from "@chakra-ui/react"
import { ArrowForwardIcon } from "@chakra-ui/icons"
import { useRouter } from "next/router"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { CandyMachineV2, Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js"
import { PublicKey } from "@solana/web3.js";

const Connected: FC = () => {
    const { connection } = useConnection();
    const wallet = useWallet();
    const [candyMachine, setCandyMachine] = useState<CandyMachineV2>();
    const router = useRouter();
    const [isMinting, setIsMinting] = useState(false);
    const metaplex = useMemo(() => {
        return Metaplex.make(connection).use(walletAdapterIdentity(wallet))
    }, [connection, wallet]);

    useEffect(() => {
        if (!metaplex) return;

        metaplex.candyMachinesV2().findByAddress({
            address: new PublicKey("Bav4iveCLPk4dHMPGLEQ5sSBqiKLLPk9H43duFWLPjYi")
        }).then((candyMachine) => {
            console.log(candyMachine)
            setCandyMachine(candyMachine);
        }).catch((err) => {
            alert(err);
        })
    }, [metaplex]);

    const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
        async (event) => {
            if (event.defaultPrevented) return;
            if (!wallet.connected || !candyMachine) return;

            try {
                setIsMinting(true);
                const nft = await metaplex.candyMachinesV2().mint({ candyMachine });
                console.log(nft);
                router.push(`/newMint?mint=${nft.nft.address.toBase58()}`);

            } catch (error) {
                alert(error);
            } finally {
                setIsMinting(false);
            }
        },
        [metaplex, wallet, candyMachine]
    )

    return (
        <VStack spacing={20}>
            <Container>
                <VStack spacing={8}>
                    <Heading
                        color="white"
                        as="h1"
                        size="2xl"
                        noOfLines={1}
                        textAlign="center"
                    >
                        Welcome Buildoor.
                    </Heading>

                    <Text color="grey" fontSize="xl" noOfLines={3} textAlign="center">
                        Each buildoor is randomly generated and can be staked to receive
                        <Text as="b"> $BLD</Text> Use your <Text as="b"> $BLD</Text> to
                        upgrade your buildoor and receive perks within the community!
                    </Text>
                </VStack>
            </Container>

            <HStack spacing={10}>
                <Image src="avatar1.png" alt="" />
                <Image src="avatar2.png" alt="" />
                <Image src="avatar3.png" alt="" />
                <Image src="avatar4.png" alt="" />
                <Image src="avatar5.png" alt="" />
            </HStack>

            <Button bgColor="darkviolet" onClick={handleClick} isLoading={isMinting} _hover={{ bg: "#171923" }} color="white" maxW="380px">
                <HStack>
                    <Text>mint buildoor</Text>
                    <ArrowForwardIcon />
                </HStack>
            </Button>
        </VStack>
    )
}

export default Connected