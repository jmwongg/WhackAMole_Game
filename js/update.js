let chromeBugWorkaround = true;

const getMolePosition = function () {
  return { x: 2 * Math.random() - 1, y: 0.73 * (2 * Math.random() - 1) };
};

const getMoleSize = function () {
  // Function to generate a scale / size of the mole
  // You can use a discrete number of values for scale (e.g. three values 1.25, 1.5, 2)
  // Each value should be returned the same number of times over a single run of the experiment

  // Currently the function randomly returns one of three values: 1.25, 1.5, and 2.0
  return [1.25, 1.5, 2.0][Math.floor(Math.random() * 3)];
};

const getTimeout = function () {
  // Function that generates the time available for the user to click on the mole
  // It returns a value in milliseconds, and the display time should be the calculated MT

  const moleSize = getMoleSize();

  const molePosition = getMolePosition();

  // Define constants for Fitt's Law calculations
  const a = 1.0157 * 1000;
  const b = 1.6987 * 1000;

  const distance = Math.sqrt(molePosition.x ** 2 + molePosition.y ** 2);

  const calculateID = (distance, moleSize) => {
    return Math.log2((distance) / moleSize + 1);
  };

  const ID = calculateID(distance, moleSize);

  const MT = (ID) => {
    return a * ID + b;
  };

  // The original MT is calculated based on Fitt's Law.
  // To make the moles disappear quicker after each round, you can decrease the MT value.
  // For example, you can multiply the MT by a factor less than 1.
  const quickenFactor = 0.5; // Adjust this factor as needed
  const displayTime = Math.ceil(MT(ID) * quickenFactor);

  // Return the adjusted display time
  return displayTime;
};





const getCSVDataLine = function (obj, pid) {
  // Function that converts each log entry into a single comma-separated string

  const moleSize = getMoleSize();
  const molePosition = getMolePosition();
  const distance = Math.sqrt(molePosition.x ** 2 + molePosition.y ** 2);

  // Convert timestamps into computed values
  const startTS = obj.startTS;
  const rndDelayStart = obj.rndDelayStart;
  const rndDelayEnd = obj.rndDelayEnd;
  const userMoveStart = obj.userMoveStart;
  const userEnterMole = obj.userEnterMole;
  const userClickMole = obj.userClickMole;

  const rndDelayDuration = rndDelayEnd - rndDelayStart;
  const movementTime = userClickMole - rndDelayEnd;
  const calculateID = (distance, moleSize) => {
    return Math.log2(distance / moleSize + 1);
  };
  const moleID = calculateID(distance, moleSize);

  // Currently, the function returns raw timestamps only as a CSV string
  return [
    pid,
    obj.tid,
    obj.startTS,
    obj.rndDelayStart,
    obj.rndDelay,
    obj.rndDelayEnd,
    obj.moleStats,
    obj.userMoveStart,
    obj.userEnterMole,
    obj.userClickMole,
    obj.hitSuccess,
    distance, // Include the calculated distance in the CSV output
    movementTime / 1000, // Time taken to complete the trial
    moleID,
  ].join(",");
};
