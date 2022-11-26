import { useWallet } from "@solana/wallet-adapter-react";
import { FC, ReactNode } from "react";
import styles from "../styles/Home.module.css";
import Head from "next/head";
import { Box, Center, Spacer, Stack } from "@chakra-ui/react";
import NavBar from "./NavBar";

const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
    const { connected } = useWallet();

    return (
        <div className={styles.container}>
            <Head>
                <title>Buildoors</title>
                <meta name="The NFT Collection for Buildoors" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Box
                w="full"
                h="calc(100vh)"
                bgImage={connected ? "" : "url(/home-background.svg"}
                backgroundPosition="center"
            >
                <Stack
                    w="full"
                    h=" calc(100vh)"
                    justify="center"
                >
                    <NavBar />

                    <Spacer />

                    <Center>{children}</Center>

                    <Spacer />

                    <Center>
                        <Box marginBottom={4} color="white">
                            <a
                                href="https://twitter.com/_buildspace"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                build with @_buildspace
                            </a>
                        </Box>
                    </Center>

                </Stack>

            </Box>

        </div>
    )
}

export default MainLayout;