'use strict';

const yup = require('yup');

const schema = yup.object().shape({
    login: yup.string().required('Informe o login!'),
    password: yup.string().required('Informe o password!'),
    data: yup.string()
             .required('Informe a data')
             .matches(/^(([0][1-9])|([2][0-9])|([3][0-1]))\/(([0][1-9])|([1][0-2]))\/([1-9][0-9][0-9][0-9])$/mg, 'Data inválida!')
});

module.exports = schema;