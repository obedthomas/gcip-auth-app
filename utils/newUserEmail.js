const config = require('config')
const template = require('../emailTemplates/newStaff')
const mg = config.get('mailgun')
const clientUrl = config.get('clientUrl')
const mailgun = require('mailgun-js')({
  apiKey: mg.key,
  domain: mg.domain,
})

const newUserEmail = (firstName, lastName, email, token) => {
  return new Promise((resolve, reject) => {
    const link = `${clientUrl}/public/register/${token}`
    const html = template(firstName, lastName, link)
    const data = {
      from: 'IT <postmaster@mg.gcipltd.com>',
      to: email,
      subject: 'Activate your account',
      html,
    }

    Promise.all([link, html, data]).then(values => {
      values &&
        mailgun.messages().send(data, (err, body) => {
          return !err ? resolve(body) : reject(err)
        })
    })
  })
}

module.exports = newUserEmail
