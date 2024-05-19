import {
  IconBrain, IconCircleCheck, IconCircleX,
  IconExclamationCircle, IconEye, IconEyeClosed,
  IconEyeCode, IconFlag, IconHeartHandshake,
  IconList, IconMessage, IconMoodLookDown,
  IconMoodSilence, IconPassword, IconPencilCode,
  IconSalt, IconShield, IconTerminal2, IconTools,
  IconWorld
} from "@tabler/icons-react"

const guideSlides = [
  {
    image: IconExclamationCircle,
    title: "NEVER USE A PASSWORD AGAIN",
    content: <p>Wait, what? Isn't Passenger a password manager?</p>
  },
  {
    image: IconCircleX,
    title: "No, Passenger is a passphrase manager",
    content: <p>Then, what is a passphrase?</p>
  },
  {
    image: IconCircleCheck,
    title: "Passphrases are longer than a word",
    content: <p>
      They are a <b>sequence of words</b>,
      like a sentence but still <u>easy to remember</u>
      and even <u>more secure.</u>
    </p>
  },
  {
    image: IconShield,
    title: "Which one is looking more secure?",
    content: <>
      <p>
        <code>P4$S3ng3r</code>

        <span className="font-medium flex items-center justify-center gap-8 before:w-full before:h-0.5 before:bg-tuatara-500 dark:before:bg-tuatara-500 after:w-full after:h-0.5 after:bg-tuatara-500 dark:after:bg-tuatara-500">
          or
        </span>

        <code>iC0mp1l3dMy0wnP4$s3ng3r@H0m3</code>
      </p>
    </>
  },
  {
    image: IconBrain,
    title: "You know the answer.",
    content: <p>But both of them are <u>still easy to remember</u>, right?</p>
  },
  {
    image: IconEye,
    title: "NEVER use the same passphrases",
    content: <p>
      Imagine you have a key to your house. You wouldn't use the same key for your car, office, summer house, etc. right?
    </p>
  },
  {
    image: IconEyeClosed,
    title: "Once you lose one key",
    content: <p>You lose all of them. Your house, car, office, summer house...</p>
  },
  {
    image: IconHeartHandshake,
    title: "Use different passphrases for each site",
    content: <p>Passenger will assists you manage them.</p>
  },
  {
    image: IconTools,
    title: "Never use a weak passphrase",
    content: <p>A robber can easily break into your house <i>with just a toothpick</i> if your door has a weak lock.</p>
  },
  {
    image: IconCircleCheck,
    title: "Passenger will lead you",
    content: <p>to create or generate strong passphrases and manage them.</p>
  },
  {
    image: IconMessage,
    title: "Here are some tips for creating strong passphrases",
    content: <small className="text-sm mt-4 text-tuatara-500">If you've found this boring so far, you can find some interesting tips here.</small>
  },
  {
    image: IconPassword,
    title: "Admit it,",
    content: <p>you've used the same password on different platforms before</p>
  },
  {
    image: IconSalt,
    title: "Maybe you've heard of the salt",
    content: <p>It's a random value that is added to the password before hashing. It makes the password <u>more secure.</u></p>
  },
  {
    image: IconMoodLookDown,
    title: "Why not use your old password",
    content: <p>as a <u>salt?</u></p>
  },
  {
    image: IconMoodSilence,
    title: "You don't even need to save it anywhere.",
    content: <p>Save your passphrases <i>without your salt here.</i> Copy them from Passenger and then <i>add your salt manually.</i></p>
  },
  {
    image: IconWorld,
    title: "Also, check online tools",
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
    title: "There are tools to crack those hashes",
    content: <p>You can check yourself to see how easy it is to crack your password's hash with <code>hashcat</code> command.</p>
  },
  {
    image: IconList,
    title: "There are lists of widely used passwords",
    content: <p>Passenger has a 1.000.000 most used password list and will never let you use them.</p>
  },
  {
    image: IconTools,
    title: "In case you didn't know",
    content: <p>
      Passenger uses <b>AES GCM</b> encryption algorithm,
      your operating system's secure <b>keychain</b>,
      and <b>JWT</b> system to secure your passphrases.
    </p>
  },
  {
    image: IconPencilCode,
    title: "You can add an extra layer of security",
    content: <p>
      By writing a <code>EnDeCode</code> class in source code and compile it yourself.
      This means you will have a unique Passenger client that only you use.
    </p>
  },
  {
    image: IconFlag,
    title: "Then Let's Start",
    content: <p>You are ready to use Passenger. Remember, you can import your passwords from your favorite web browser.</p>
  }
]

export default guideSlides