import React from "react";
import { Container, Nav } from "react-bootstrap";
import { useContractKit } from "@celo-tools/use-contractkit";
import { Notification } from "./components/ui/Notifications";
import Wallet from "./components/Wallet";
import Cover from "./components/minter/Cover";
import Nfts from "./components/minter/nfts";
import { useBalance, useMinterContract } from "./hooks";
import coverImg from "./assets/img/nft_geo_cover.png";
import "./App.css";
import { x } from "./context";

const App = function AppWrapper() {
  const { address, destroy, connect } = useContractKit();
  const { balance, getBalance } = useBalance();
  const minterContract = useMinterContract();
  const { content, setContent } = React.useContext(x);
  let title = content === "collection" ? "GEO Collection" : "GEO Marketplace";

  return (
    <>
      <Notification />
      {address ? (
        true ? (
          <Container fluid="md">
            <Nav className="d-flex pt-3 py-1 px-3 gap-5 ">
              <Nav.Item>
                <Nav.Link
                  className="mx-2 "
                  onClick={() => {
                    setContent("collection");
                  }}
                >
                  <h3>Collection</h3>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  className="mx-2 "
                  onClick={() => {
                    setContent("marketplace");
                  }}
                >
                  <h3>Marketplace</h3>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="ms-auto">
                <Wallet
                  address={address}
                  amount={balance.CELO}
                  symbol="CELO"
                  destroy={destroy}
                />
              </Nav.Item>
            </Nav>

            <main className="mt-4">
              <Nfts
                name={title}
                updateBalance={getBalance}
                minterContract={minterContract}
              />
            </main>
          </Container>
        ) : (
          <div></div>
        )
      ) : (
        <Cover name="GEO Collection" coverImg={coverImg} connect={connect} />
      )}
    </>
  );
};

export default App;
