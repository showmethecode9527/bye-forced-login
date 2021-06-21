const path = require('path')
const jsonfile = require('jsonfile')

const manifestJson = path.resolve(__dirname, 'manifest.template.json')
const packageJson = path.resolve(__dirname, '..', 'package.json')
const toFile = path.resolve(__dirname, '..', 'src', 'manifest.json')

const { name, version, description } = jsonfile.readFileSync(packageJson)

const obj = Object.assign(jsonfile.readFileSync(manifestJson), {
  name,
  version,
  description
})

jsonfile.writeFileSync(toFile, obj, {
  spaces: 2
})
