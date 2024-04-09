const asyncHandler = require('express-async-handler');
const Comuna = require('../models/comuna');
const { body, validationResult } = require('express-validator');

exports.getComunas = asyncHandler(async (req, res) => {
  const comunas = await Comuna.find().sort({ name: 1 }).exec();
  res.status(200).json({ status: 'success', data: { comunas } });
});

exports.getComuna = asyncHandler(async (req, res) => {
  const comuna = await Comuna.findById(req.params.id).exec();

  if (!comuna) {
    res.status(404).json({
      status: 'error',
      message: 'Comuna does not exist.',
    });
    return;
  }

  res.status(200).json({
    status: 'success',
    data: { comuna },
  });
});

exports.createComuna = [
  body('name').trim().escape(),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        status: 'fail',
        data: errors,
      });
      return;
    }

    const comuna = new Comuna({
      name: req.body.name,
    });

    const newComuna = await comuna.save();
    res.status(200).json({
      status: 'success',
      data: { comuna: newComuna },
    });
  }),
];

exports.updateComuna = [
  body('name').trim().escape(),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        status: 'fail',
        data: errors,
      });
      return;
    }

    const id = req.params.id;
    const payload = { name: req.body.name };

    const comuna = await Comuna.findByIdAndUpdate(id, payload, { new: true });

    if (!comuna) {
      res.status(404).json({
        status: 'error',
        message: 'Comuna does not exist.',
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      data: { comuna },
    });
  }),
];

exports.deleteComuna = asyncHandler(async (req, res) => {
  const comuna = await Comuna.findByIdAndDelete(req.params.id).exec();

  if (!comuna) {
    res.status(404).json({
      status: 'error',
      message: 'Comuna does not exist.',
    });
    return;
  }

  res.status(200).json({ status: 'success', data: null });
});
