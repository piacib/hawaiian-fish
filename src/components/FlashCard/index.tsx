import React, { useState } from "react";
import { Container, Header, FishID, Button, ButtonDisplay } from "./styles";
import dataset from "../../dataset3.json";
interface Props {
  datasetLength: number;
}
interface CardSideProps {
  cardID: number;
  onClick: () => any;
}
const FlashCardFront: React.FC<CardSideProps> = ({ onClick, cardID }) => {
  return (
    <Container onClick={onClick}>
      <Header>Front</Header>
      <FishID>{cardID}</FishID>
    </Container>
  );
};
const FlashCardBack: React.FC<CardSideProps> = ({ onClick, cardID }) => {
  return (
    <Container onClick={onClick}>
      <Header>Back</Header>
      <FishID>{dataset[cardID].url}</FishID>
      <FishID>{cardID}</FishID>
    </Container>
  );
};
function removeItem<T>(arr: Array<T>, value: T) {
  const index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}
const randomEntry = (array: number[]) =>
  array[Math.floor(Math.random() * array.length)];
const arrayOfKeysOriginal = Array.from(Array(dataset.length).keys());
type TestedCard = { cardID: number; memory: number };
type TestedCardsType = TestedCard[] | [];

const FlashCard: React.FC<Props> = ({ datasetLength }) => {
  const [displayFront, setDisplayFront] = useState(true);
  const [arrayOfKeys, setArrayOfKeys] = useState(arrayOfKeysOriginal);
  const [cardID, setCardID] = useState(randomEntry(arrayOfKeys));
  const [seenCards, setSeenCards] = useState<TestedCardsType>([]);
  const displayNewCard = () => {
    setCardID(randomEntry(arrayOfKeys));
    setDisplayFront(true);
  };
  console.log("arrayOfKeys", arrayOfKeys);
  return (
    <>
      {displayFront ? (
        <FlashCardFront
          onClick={() => setDisplayFront(!displayFront)}
          cardID={cardID}
        />
      ) : (
        <>
          <FlashCardBack
            onClick={() => setDisplayFront(!displayFront)}
            cardID={cardID}
          />
          <ButtonDisplay>
            <Button
              onClick={() => {
                displayNewCard();
                setArrayOfKeys([...arrayOfKeys, cardID, cardID]);
              }}
            >
              Nope
            </Button>
            <Button
              onClick={() => {
                displayNewCard();
              }}
            >
              Meh
            </Button>
            <Button
              onClick={() => {
                displayNewCard();
                const index = arrayOfKeys.findIndex((x) => x === cardID);
                setArrayOfKeys(removeItem(arrayOfKeys, index));
              }}
            >
              Got it!
            </Button>
          </ButtonDisplay>
        </>
      )}
    </>
  );
};

export default FlashCard;
