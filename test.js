
printMe("Test").then(console.log("Erster"))



async function printMe(string) {
  await setTimeout(() => {
    console.log(string)
  }, 1000);
}