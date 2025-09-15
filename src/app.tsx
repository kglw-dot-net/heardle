import React from "react";
import _ from "lodash";

import { Song } from "./types/song";
import { GuessType } from "./types/guess";
import { RunStatsType } from "./types/stats";

import { todaysIndex, todaysSolution } from "./helpers";

import { Header, HistoryPopUp, InfoPopUp, Game, Footer } from "./components";

import * as Styled from "./app.styled";

function App() {
  const initialGuess = {
    song: undefined,
    skipped: false,
    isCorrect: undefined,
  } as GuessType;

  const [guesses, setGuesses] = React.useState<GuessType[]>(
    Array.from({ length: 6 }).fill(initialGuess) as GuessType[]
  );
  const [currentTry, setCurrentTry] = React.useState<number>(0);
  const [selectedSong, setSelectedSong] = React.useState<Song>();
  const [didGuess, setDidGuess] = React.useState<boolean>(false);

  const firstRun = localStorage.getItem("firstRun") === null;

  let stats: RunStatsType[] = JSON.parse(localStorage.getItem("stats2") || "[]");

  function getMostRecentRun() {
    return stats.filter(x => x.index === todaysIndex)[0];
  }

  React.useEffect(() => {
    if (Array.isArray(stats) && stats.length > 0) {
      const visitedToday = stats.filter(x => x.index === todaysIndex).length > 0;

      if (!visitedToday) {
        stats.push({
          solution: todaysSolution,
          currentTry: 0,
          didGuess: false,
          guesses: guesses,
          index: todaysIndex
        });
      } else {
        const { currentTry, guesses, didGuess } = getMostRecentRun();
        setCurrentTry(currentTry);
        setGuesses(guesses);
        setDidGuess(didGuess);
      }
    } else {
      // initialize stats
      // useEffect below does rest
      stats = [];
      stats.push({
        solution: todaysSolution,
        currentTry: 0,
        didGuess: false,
        guesses: guesses,
        index: todaysIndex
      });
    }
  }, []);

  React.useEffect(() => {
    if (Array.isArray(stats)) {
      getMostRecentRun().currentTry = currentTry;
      getMostRecentRun().didGuess = didGuess;
      getMostRecentRun().guesses = guesses;
    }
  }),
    [guesses, currentTry, didGuess];

  React.useEffect(() => {
    localStorage.setItem("stats2", JSON.stringify(stats));
  }, [stats]);

  const [isInfoPopUpOpen, setIsInfoPopUpOpen] =
    React.useState<boolean>(firstRun);

  const openInfoPopUp = React.useCallback(() => {
    setIsInfoPopUpOpen(true);
  }, []);

  const closeInfoPopUp = React.useCallback(() => {
    if (firstRun) {
      localStorage.setItem("firstRun", "false");
    }
    setIsInfoPopUpOpen(false);
  }, [localStorage.getItem("firstRun")]);

  const [isHistoryPopUpOpen, setIsHistoryPopUpOpen] =
    React.useState<boolean>();

  const openHistoryPopUp = React.useCallback(() => {
    setIsHistoryPopUpOpen(true);
  }, []);

  const closeHistoryPopUp = React.useCallback(() => {
    setIsHistoryPopUpOpen(false);
  }, []);

  const skip = React.useCallback(() => {
    setGuesses((guesses: GuessType[]) => {
      const newGuesses = [...guesses];
      newGuesses[currentTry] = {
        song: undefined,
        skipped: true,
        isCorrect: undefined,
      };

      return newGuesses;
    });

    setCurrentTry((currentTry) => currentTry + 1);

    // event({
    //   category: "Game",
    //   action: "Skip",
    // });
  }, [currentTry]);

  const guess = React.useCallback(() => {
    const isCorrect = selectedSong === todaysSolution;

    if (!selectedSong) {
      alert("Choose a song");
      return;
    }

    setGuesses((guesses: GuessType[]) => {
      const newGuesses = [...guesses];
      newGuesses[currentTry] = {
        song: selectedSong,
        skipped: false,
        isCorrect: isCorrect,
      };

      return newGuesses;
    });

    setCurrentTry((currentTry) => currentTry + 1);
    setSelectedSong(undefined);

    if (isCorrect) {
      setDidGuess(true);
    }

    // event({
    //   category: "Game",
    //   action: "Guess",
    //   label: `${selectedSong.artist} - ${selectedSong.name}`,
    //   value: isCorrect ? 1 : 0,
    // });
  }, [guesses, selectedSong]);

  return (
    <main>
      <Header openInfoPopUp={openInfoPopUp} openHistoryPopUp={openHistoryPopUp} />
      {isInfoPopUpOpen && <InfoPopUp onClose={closeInfoPopUp} />}
      {isHistoryPopUpOpen && <HistoryPopUp stats={stats} onClose={closeHistoryPopUp} />}
      <Styled.Container>
        <Game
          guesses={guesses}
          didGuess={didGuess}
          todaysSolution={todaysSolution}
          currentTry={currentTry}
          setSelectedSong={setSelectedSong}
          skip={skip}
          guess={guess}
        />
      </Styled.Container>
      {/* <Footer /> */}
    </main>
  );
}

export default App;
