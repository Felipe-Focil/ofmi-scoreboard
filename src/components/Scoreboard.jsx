import React, { useState, useEffect } from 'react';
import MedalSelector from './MedalSelector.jsx';
import ScoreboardTable from './ScoreboardTable.jsx';
import LoadingSpinner from './LoadingSpinner.jsx';
import NotFound from './NotFound.jsx';
import * as sb from '../utils/ScoreboardUtils.jsx';
import * as api from '../utils/ApiFetch.jsx';
import { useQuery } from 'react-query';

const Scoreboard = ({ link, admin, gold = 0, silver = 0, bronze = 0, criteria = 'medals', title = '', diploma = false, diplomaCriteria = 'points', minScore = 0 }) => {
    const [problems, setProblems] = useState([]);
    const [scoreboards, setScoreboards] = useState([]);
    const [goldThreshold, setGoldThreshold] = useState(gold);
    const [silverThreshold, setSilverThreshold] = useState(silver);
    const [bronzeThreshold, setBronzeThreshold] = useState(bronze);
    const [medalCriterion, setMedalCriterion] = useState(criteria);
    const [running, setRunning] = useState(false);
    const [_minScore, setMinScore] = useState(minScore);
    const [_diploma, setDiploma] = useState(diploma);
    const [_diplomaCriteria, setDiplomaCriteria] = useState(diplomaCriteria);
    const [contestTitle,setTitle] = useState(title);

    const handleThresholdsChange = (criteria, gold, silver, bronze, diploma, diplomaCriteria, minScore) => {
        setMedalCriterion(criteria);
        setGoldThreshold(gold);
        setSilverThreshold(silver);
        setBronzeThreshold(bronze);
        setDiploma(diploma);
        setDiplomaCriteria(diplomaCriteria);
        setMinScore(minScore);
    };

    const { data: scoreboardData, isLoading, isError } = useQuery(['scoreboardData', link], () => api.fetchAPI(link));

    useEffect(() => {
        if (scoreboardData) {
            const payloadJSON = scoreboardData["scoreboard"];
            const currentTime = new Date();
            const startTime = new Date(payloadJSON["start_time"] * 1000);
            const finishTime = new Date(payloadJSON["finish_time"] * 1000);

    
                setTitle(scoreboardData.contest.title);
            

            const rankingTemp = Object.values(payloadJSON["ranking"]);
            const ranking = sb.formatScoreboard(rankingTemp);
            setScoreboards(ranking);
            setProblems(payloadJSON["problems"]);

            if (startTime <= currentTime && currentTime <= finishTime) setRunning(true);
            else setRunning(false);

            handleThresholdsChange(criteria, gold, silver, bronze, _diploma, _diplomaCriteria, _minScore);
        }
    }, [scoreboardData, gold, silver, bronze, criteria, diploma, diplomaCriteria, minScore]);

    if (isError) {
        return <NotFound error={"No se encontró el scoreboard"} />;
    }

    if (isLoading || scoreboardData === undefined) {
        return <LoadingSpinner />;
    }

    const columns = sb.getColumns(problems);
    const rows = sb.getRows(scoreboards, medalCriterion, goldThreshold, silverThreshold, bronzeThreshold, _diploma, _diplomaCriteria, _minScore);

    return (
        <>
            <h1>{contestTitle} {running ? "(En Curso)" : "(Terminado)"}</h1>
            {admin && <MedalSelector onChangeThresholds={handleThresholdsChange} gold={gold} silver={silver} bronze={bronze} criteria={medalCriterion} diploma={_diploma} diplomaCriteria={_diplomaCriteria} minScore={_minScore} />}
            <ScoreboardTable headers={columns} data={rows} />
            {admin && <ExportData columns = {columns} rows = {rows}/>}
        </>
    );
};

export default Scoreboard;
