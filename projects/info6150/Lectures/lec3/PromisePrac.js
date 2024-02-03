const productFetch = fetch('https://dummyjson.com/product');

const success = resp => resp.json()

const processData = (data) => console.log(data)
const handleFetchError = (data) => console.log(data)

const testMethod = async () => {
    const data = await productFetch
        .then(success)
        .then(data => data)
        .catch(handleFetchError)
    console.log(data)
}

testMethod()

// const data = productFetch
//     .then(success)
//     .then(processData)
//     .catch(handleFetchError)
// console.log(data) // this is not callable as now data may not have any data