'use strict';

const express = require('express');
const app = express();

const yup = require('yup');
// const { setLocale } = require('yup');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.post('/', async (req, res) => {

    const schema = yup.object().shape({
        login: yup.string().required(),
        password: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Invalid request!' });
    }

    return res.json({ status: 'ok', content: req.body });
});

app.post('/custom-message', async (req, res) => {
    try {
        const schema = yup.object().shape({
            login: yup.string().required('Informe o login!'),
            password: yup.string().required('Informe o password!'),
        });

        await schema.validate(req.body, { abortEarly: false });

        const { login, password } = req.body;

        return res.status(200).json({ status: 'ok', content: { login, password } });
    } catch (err) {
        return res.status(400).json({ mensagens: err.errors });
    }
});

const validatemiddleware = require('./validate-middleware');
const loginschema = require('./login-schema-validation');

app.post('/custom-message-middleware', validatemiddleware(loginschema), async (req, res) => {
    try {
        const { login, password, data } = req.body;

        return res.status(200).json({ status: 'ok', content: { login, password, data } });
    } catch (err) {
        return res.status(400).json({ mensagens: err.errors });
    }
});

app.listen(3010);