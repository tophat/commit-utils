import mainSafe from './main'

mainSafe().then(errorCode => process.exit(errorCode))
