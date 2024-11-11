//! nag initialize tayo ng remaining item each
const prizes = {
  "Choeey Choco": 40,
  "Mystery Gift": 20,
  "Chichirya ni Bon": 1,
};
function spin() {
  const wheel = document.getElementById("wheel");
  const resultDiv = document.getElementById("result");
  const segments = 3;

  //! bago i-spin mag aauto hide yung result
  resultDiv.style.display = "none";

  //! dito makikita yung mga percentage and pwede i-manipulate yung winning chance
  const probabilities = [
    { segment: `Choeey Choco`, probability: 0.7 }, // 60%
    { segment: `Mystery Gift`, probability: 0.3 }, // 40%
    { segment: `Chichirya ni Bon`, probability: 0.01 }, // 1%
  ];

  //! itong function na ito ginagamit para ma define yung actual percentage
  function getRandomSegment() {
    const availableProbabilities = probabilities.filter(
      (p) => prizes[p.segment] > 0
    );

    if (availableProbabilities.length === 0) {
      alert("All prizes are out of stock!");
      return null;
    }

    const randomNum = Math.random();
    console.log("Random Number: " + randomNum); //! For debugging to show the exact random number or chance of winning using Math.random()
    let cumulativeProbability = 0;
    for (let i = 0; i < availableProbabilities.length; i++) {
      cumulativeProbability += availableProbabilities[i].probability;
      //! For debugging: Show cumulative probability for each segment
      console.log(
        "Cumulative Probability for Segment " + i + ": " + cumulativeProbability
      );
      if (randomNum <= cumulativeProbability) {
        //! For debugging: Show the selected segment
        console.log("Selected Segment: " + availableProbabilities[i].segment);
        return availableProbabilities[i].segment;
      }
    }
    // !default last segment
    console.log("Default to last segment");
    return availableProbabilities[availableProbabilities.length - 1].segment;
  }

  //!mag r-reset yung animation after spin
  wheel.style.transition = "none";
  wheel.style.transform = "rotate(0deg)";

  wheel.offsetHeight;

  const targetSegment = getRandomSegment();
  const segmentDegree = 360 / segments;

  //!if kung wala ng laman yung remaining automatically lalabas yung out of stock
  if (!targetSegment) {
    return;
  }

  //! dito pwede i-calculate yung visualize spinning
  const spinDegree =
    segmentDegree *
      probabilities.findIndex((p) => p.segment === targetSegment) +
    //! using this 360deg multiply by 15 or kahit anong pwede ilagay
    360 * 15;

  //! transition spinning
  wheel.style.transition = "transform 4s ease-out";
  wheel.style.transform = `rotate(${spinDegree}deg)`;

  //! magpapakita yung result after spinning
  setTimeout(() => {
    resultDiv.style.display = "block"; // Show the result text
    resultDiv.innerHTML = `You won: Prize ${targetSegment}`;

    //! dito  makikita yung deduct pag nag spin ka or (item remaining)
    if (prizes[targetSegment] > 0) {
      prizes[targetSegment] -= 4 ;
      console.log(`${targetSegment} remaining: ${prizes[targetSegment]}`);
    } else {
      console.log(`${targetSegment} is out of stock, no deduction.`);
    }

    //! mag u-update yung text sa html after mo mag spin
    document.getElementById("mystery-qty").textContent = prizes["Mystery Gift"];
    document.getElementById("choeey-qty").textContent = prizes["Choeey Choco"];
    document.getElementById("chichirya-qty").textContent =
      prizes["Chichirya ni Bon"];
  }, 4000); //! Duration ng spin time result like 4000 === 4 sec pwede i-modify yung seconds
}
