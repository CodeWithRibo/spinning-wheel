function spin() {
  const wheel = document.getElementById("wheel");
  const resultDiv = document.getElementById("result");
  const segments = 3;

  //! bago i-spin by default naka none yung result
  resultDiv.style.display = "none";

  //!dito pwede natin i-define kung ano ang chance of winning using percentage
  const probabilities = [
    { segment: `Choeey Choco`, probability: 0.9 }, //! 90%
    { segment: `Mystery Gift`, probability: 0.25 }, //! 25%
    { segment: `Chichirya ni Bon`, probability: 0.01 }, //! 1%
  ];

  //!gumamit tayo ng function para ma calculate yung exact probability
  function getRandomSegment() {
    const randomNum = Math.random();
    console.log("Random Number: " + randomNum); //!para lang ma define natin yung exact random number or chance of winning using Math.Random
    let cumulativeProbability = 0;
    for (let i = 0; i < probabilities.length; i++) {
      cumulativeProbability += probabilities[i].probability;
      //!Pinapakita dito kung ano ang mga segmet of winning and chance percentage in console
      console.log(
        "Cumulative Probability for Segment " + i + ": " + cumulativeProbability
      );
      if (randomNum <= cumulativeProbability) {
        console.log("Selected Segment: " + probabilities[i].segment); //! show segmet probability
        return probabilities[i].segment;
      }
    }
    console.log("Default to last segment");
    return probabilities[probabilities.length - 1].segment;
  }

  //!After spinning mag r-reset yung wheel and also yung functions sa Math.Random
  wheel.style.transition = "none";
  wheel.style.transform = "rotate(0deg)";

  wheel.offsetHeight;

  const targetSegment = getRandomSegment();
  const segmentDegree = 360 / segments;
  //! ginamit ito ng simple operator para sa visualization ng spinning wheel
  const spinDegree =
    segmentDegree *
      probabilities.findIndex((p) => p.segment === targetSegment) +
    360 * 15;

  wheel.style.transition = "transform 4s ease-out";
  wheel.style.transform = `rotate(${spinDegree}deg)`;

  setTimeout(() => {
    resultDiv.style.display = "block"; //!showing text after spinning
    resultDiv.innerHTML = `You won: Prize ${targetSegment}`;
  }, 4000); //!durating time ng spinning wheel
}
