import bcrypt from 'bcrypt';

import User from '../models/user';

export const getJoin = (req, res) => {
  res.render('join');
};

export const postJoin = async (req, res) => {
  const { id, password, password2, name } = req.body;

  if (password !== password2) {
    res.status(400).render('join', {
      errorMessage: '비밀번호가 일치하지 않습니다.',
    });
    return;
  }

  const exists = await User.exists({
    id,
  });

  if (exists) {
    res.status(400).render('join', {
      errorMessage: '이미 존재하는 아이디입니다.',
    });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await User.create({
    id,
    password: hashedPassword,
    name,
  });

  res.status(200).redirect('/login');
};

export const idCheck = async (req, res) => {
  const { id } = req.body;

  const exists = await User.exists({ id });

  if (exists) {
    res.status(409).json({
      ok: false,
      message: 'ID가 죽복입니다.',
    });
    return;
  }

  res.status(200).json({
    ok: true,
    message: '사용할 수 있는 ID입니다.',
  });
};

export const getLogin = (req, res) => {
  res.render('login');
};

export const postLogin = async (req, res) => {
  const { id, password } = req.body;

  const user = await User.findOne({ id });

  if (!user) {
    res.status(400).json({
      ok: false,
      errorMessage: '존재하지 않는 유저입니다.',
    });
    return;
  }

  const pwCompare = await bcrypt.compare(password, user.password);

  if (!pwCompare) {
    res.status(400).json({
      ok: false,
      errorMessage: '비밀번호가 틀렸습니다',
    });
    return;
  }

  req.session.loggedIn = true;
  req.session.user = user;

  res.status(200).json({
    ok: true,
    message: '로그인 성공',
  });
};

export const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/login');
};