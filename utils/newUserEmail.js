const config = require('config')
const template = require('../emailTemplates/newStaff')
const mg = config.get('mailgun')
const clientUrl = config.get('clientUrl')
const mailgun = require('mailgun-js')({
  apiKey: mg.key,
  domain: mg.domain,
})

const newUserEmail = async (data, res) => {
  const { firstName, lastName, email, token } = data
  const link = `${clientUrl}/public/register/${token}`
  const html = await template(firstName, lastName, link)

  try {
    const data = {
      from: 'IT <itsolutions@gcipltd.com>',
      to: email,
      subject: firstName,
      html,
    }

    mailgun.messages().send(data, (err, body) => {
      console.log(body)
      return res.json({ body })
    })
  } catch (err) {
    console.log(err.message)
    return res.send(err)
  }
}

module.exports = newUserEmail
