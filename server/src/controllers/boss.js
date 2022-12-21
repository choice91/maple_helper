import db from '../models';
import { bossArrayToObjectFn } from '../service/functions';

export const addCharacterToBossDB = async (req, res) => {
  const {
    user: { id: loginUserId },
    body: { nickname },
  } = req;

  const character = await db.Boss.findOne({ owner: loginUserId, nickname });

  if (character) {
    res.status(400).json({
      ok: false,
      errorMessage: '이미 존재하는 캐릭터입니다.',
    });
    return;
  }

  const newCharacter = await db.Boss.create({ owner: loginUserId, nickname });

  const newCharObj = {
    [newCharacter._id]: {
      nickname: newCharacter.nickname,
      owner: newCharacter.owner,
      boss: newCharacter.boss,
    },
  };

  res.status(200).json({
    ok: true,
    newCharacter: newCharObj,
  });
};

export const deleteCharacterToBossDB = async (req, res) => {
  const {
    user: { id: loginUserId },
    params: { bossId },
  } = req;

  const bossDeleteResult = await db.Boss.deleteOne({
    owner: loginUserId,
    _id: bossId,
  });

  if (bossDeleteResult.deletedCount === 0) {
    res.status(404).json({
      ok: false,
      errorMessage: '삭제할 캐릭터가 없음',
    });
    return;
  }

  res.status(200).json({
    ok: true,
    message: '삭제완료',
  });
};

export const getBossData = async (req, res) => {
  const {
    user: { id: loginUserId },
  } = req;

  const boss = await db.Boss.find({ owner: loginUserId });

  const bossObj = bossArrayToObjectFn(boss);

  res.status(200).json({
    ok: true,
    bossData: bossObj,
  });
};

export const bossCheck = async (req, res) => {
  const {
    user: { id: loginUserId },
    body: { nickname, bossType },
  } = req;
  console.log(nickname, bossType);

  const bossData = await db.Boss.findOne({ owner: loginUserId, nickname });

  if (!bossData) {
    res.status(404).json({
      ok: false,
      errorMessage: '존재하지 않는 캐릭터',
    });
    return;
  }

  bossData.boss[`${bossType}`] = !bossData.boss[`${bossType}`];
  await bossData.save();

  res.status(200).json({
    ok: true,
    message: '완료',
  });
};
