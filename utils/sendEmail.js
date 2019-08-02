const config = require('config')
const mg = config.get('mailgun')
const clientUrl = config.get('clientUrl')
const mailgun = require('mailgun-js')({
  apiKey: mg.key,
  domain: mg.domain,
})

const sendEmail = ({ firstName, lastName, email, token, template }) => {
  // import relevant template
  let htmlTemplate = require(`../emailTemplates/${template}`)
  let subject = ''
  switch (template) {
    case 'newStaff':
      subject = 'Activate your account'
      break

    case 'recoverPassword':
      subject = 'Forgot your password?'
      break

    default:
      subject = ''
      break
  }

  return new Promise((resolve, reject) => {
    const link = `${clientUrl}/public/register/${token}`
    const html = htmlTemplate(firstName, lastName, link)
    const data = {
      from: 'IT <postmaster@mg.gcipltd.com>',
      to: email,
      subject,
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

module.exports = sendEmail
