import { IconBrain, IconCircleCheck, IconCircleX, IconExclamationCircle, IconEye, IconEyeClosed, IconEyeCode, IconHeartHandshake, IconList, IconMessage, IconMoodLookDown, IconPassword, IconSalt, IconShield, IconTerminal2, IconTools, IconWorld } from "@tabler/icons-react"

const guideSlides = [
  {
    image: IconExclamationCircle,
    title: "NEVER USE A PASSWORD AGAIN",
    content: <p>Wait, what? Isn't this a password manager?</p>
  },
  {
    image: IconCircleX,
    title: "No, it's a passphrase manager",
    content: <p>What is a passphrase?</p>
  },
  {
    image: IconCircleCheck,
    title: "Passphrases are longer than a word",
    content: <p>They are a sequence of words, like a sentence. But they are easier to remember than a password and even more secure.</p>
  },
  {
    image: IconShield,
    title: "Which one looks more secure?",
    content: <ul className="text-left">
      <li>passenger123</li>
      <li>thisPassengerIs@Train123</li>
    </ul>
  },
  {
    image: IconBrain,
    title: "You know the answer.",
    content: <p>But both of them are still easy to remember, right?</p>
  },
  {
    image: IconEye,
    title: "Never use the same passphrases",
    content: <p>
      Imagine you have a key to your house. You wouldn't use the same key for your car, office, summer house, etc. right?
    </p>
  },
  {
    image: IconEyeClosed,
    title: "Once you have lost one key",
    content: <p>You also lose your car, office, and summer house.</p>
  },
  {
    image: IconHeartHandshake,
    title: "Use different passphrases for each site",
    content: <p>This passphrase manager will help you to manage them.</p>
  },
  {
    image: IconTools,
    title: "Never use a weak passphrase",
    content: <p>A robber can easily break into your house with just a toothpick if your door has a weak lock.</p>
  },
  {
    image: IconCircleCheck,
    title: "Passenger will lead you",
    content: <p>to create or generate strong passphrases and manage them.</p>
  },
  {
    image: IconMessage,
    title: "But here are some tips to create a strong passphrase",
    content: <small className="text-sm mt-4 text-tuatara-500">If you are bored until now, you can find interesting tips here.</small>
  },
  {
    image: IconPassword,
    title: "Admit it,",
    content: <p>you've used the same password on different platforms before</p>
  },
  {
    image: IconSalt,
    title: "Maybe you've heard of the salt",
    content: <p>It's a random value that is added to the password before hashing. It makes the password more secure.</p>
  },
  {
    image: IconMoodLookDown,
    title: "Why don't you use your old password",
    content: <p>as a salt?</p>
  },
  {
    image: IconWorld,
    title: "And check online tools",
    content: <p>to see if your password is leaked. <a href="https://haveibeenpwned.com" target="_blank" rel="noreferrer">Have I Been Pwned</a> is a good start.</p>
  },
  {
    image: IconEyeCode,
    title: "But there is a better way",
    content: <p>
      <a href="https://breachdirectory.org/" target="_blank" rel="noreferrer">Breach Directory</a> will show the leaked passwords' first 5 characters and hashes that leaked.
    </p>
  },
  {
    image: IconTerminal2,
    title: "There are tools to crack that hashes",
    content: <p>You can check yourself to see how easy it is to crack your password's hash with <code>hashcat</code> command.</p>
  },
  {
    image: IconList,
    title: "There are lists of widely used passwords",
    content: <p>Passenger has a 1.000.000 most used password list and will never let you use them.</p>
  }
]

export default guideSlides