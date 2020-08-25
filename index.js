const Iota = require('@iota/core');
const Converter = require('@iota/converter')

const iota = Iota.composeAPI({
	provider: 'https://nodes.devnet.iota.org:443'
});

const depth = 3;
const minimumWeightMagnitude = 9;

const address = 'NMFUNLUSNCNOURGCJRXMKNRYKEONKMNRPNIULKBLIPJIQGSRTKARPWNKUDFVFGMTEZIIKYZNYAIXBUKM9';
const seed = 'OXTOGQDTXMGQGIZXRX9TFAKXJDLJZYYVERVSGHLQZUUXUOXLGRMWGTNQOXVYDVKPGV9CECUIZKQTJTRKQ';


const data = {
	message: "Hello MY FRIEND !"
};


const message = JSON.stringify(data);
console.log(message)
const messageInTrytes = Converter.asciiToTrytes(message);
console.log(messageInTrytes)


const transfers = [
{
    value: 0,
    address: address,
    message: messageInTrytes
}
];

iota.prepareTransfers(seed, transfers)
	.then(trytes => {
		return iota.sendTrytes(trytes, depth, minimumWeightMagnitude);
	})
	.then(bundle => {
		console.log("Hash: " + bundle[0].hash)
	})
	.catch(err => {
		consol.error(err)
	});
