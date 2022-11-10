import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Button, Container, Heading, HStack, VStack, Text } from "@chakra-ui/react";
import { FC, MouseEventHandler, useCallback } from "react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import { useWallet } from "@solana/wallet-adapter-react"

const Disconnected: FC = () => {


    const modalState = useWalletModal()
    const { wallet, connect } = useWallet()

    const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
        (event) => {
            if (event.defaultPrevented) {
                return
            }

            if (!wallet) {
                modalState.setVisible(true)
            } else {
                connect().catch(() => { })
            }
        },
        [wallet, connect, modalState]
    )

    return (
        <Container>
            <VStack spacing={20}>
                <Heading
                    color="white"
                    as="h1"
                    size="2xl"
                    noOfLines={2}
                    textAlign="center">
                    Mint your buildoor. Earn $BLD. Level up.
                </Heading>

                <Button
                    bgColor="darkviolet"
                    color="white"
                    maxW="380px"
                    onClick={handleClick}
                >
                    <HStack>
                        <Text>become a buildoor</Text>
                        <ArrowForwardIcon />
                    </HStack>
                </Button>
            </VStack>
        </Container>
    )
}
export default Disconnected