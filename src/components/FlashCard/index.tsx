import React, { useEffect, useState } from "react";
import {
  FlashCardContainer,
  Header,
  FishID,
  Button,
  Front,
  Back,
  ButtonDisplay,
} from "./styles";
import dataset from "../../datasetFull.json";
interface CardSideProps {
  cardID: number;
  onClick: () => any;
}
const FlashCardFront: React.FC<CardSideProps> = ({ onClick, cardID }) => {
  const fishImageSrc = dataset[cardID]?.imageUrl;
  return (
    <Front onClick={onClick}>
      <FishID>{cardID}</FishID>
      {fishImageSrc ? <img alt="fish" src={fishImageSrc} /> : null}
    </Front>
  );
};
const FlashCardBack: React.FC<CardSideProps> = ({ onClick, cardID }) => {
  return (
    <Back onClick={onClick}>
      <Header>{dataset[cardID]["Common Name"]}</Header>
      <FishID>{dataset[cardID].wikiUrl}</FishID>
      <FishID>{dataset[cardID]["Hawaiian language Name"]}</FishID>
    </Back>
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

const FlashCard: React.FC = () => {
  const [displayFront, setDisplayFront] = useState(true);
  const [arrayOfKeys, setArrayOfKeys] = useState(arrayOfKeysOriginal);
  const [cardID, setCardID] = useState(randomEntry(arrayOfKeys));
  const displayNewCard = () => {
    setCardID(randomEntry(arrayOfKeys));
    setDisplayFront(true);
  };
  console.log("arr of keys", arrayOfKeys.length);
  useEffect(() => {
    if (dataset[cardID].imageUrl === null) {
      setCardID(randomEntry(arrayOfKeys));
    }
  }, [cardID, arrayOfKeys]);
  return (
    <FlashCardContainer>
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
    </FlashCardContainer>
  );
};

export default FlashCard;
