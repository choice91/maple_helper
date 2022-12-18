import React from 'react';
import { useDispatch } from 'react-redux';

import { questCheck } from '../../redux/async/quest';
import questSlice from '../../redux/slices/questSlice';

import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

const TableCheckbox = ({ nickname, questValue, questType, questId }) => {
  const dispatch = useDispatch();

  const handleQuestCheck = () => {
    dispatch(questCheck({ nickname, questType }));
    dispatch(questSlice.actions.questCheck({ questId, questType }));
  };

  return (
    <>
      <button onClick={handleQuestCheck}>
        {questValue.quests[`${questType}`] ? (
          <CheckBoxIcon style={{ color: '#3498db' }} />
        ) : (
          <CheckBoxOutlineBlankIcon style={{ color: '#fff' }} />
        )}
      </button>
    </>
  );
};

export default TableCheckbox;
