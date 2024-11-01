import { Platform } from "../../types/link";

const getLinkPlaceholder = (platform: Platform): string => {
  const placeholders: Record<string, string> = {
    github: "https://www.github.com/johnappleseed",
    frontendmentor: "https://www.frontendmentor.io/profile/johnappleseed",
    twitter: "https://twitter.com/johnappleseed",
    linkedin: "https://www.linkedin.com/in/johnappleseed",
    youtube: "https://www.youtube.com/@johnappleseed",
    facebook: "https://www.facebook.com/johnappleseed",
    twitch: "https://www.twitch.tv/johnappleseed",
    codewars: "https://www.codewars.com/users/johnappleseed",
    freecodecamp: "https://www.freecodecamp.org/johnappleseed",
    gitlab: "https://www.gitlab.com/johnappleseed",
    hashnode: "https://www.hashnode.com/@johnappleseed",
    stackoverflow: "https://stackoverflow.com/users/1234567/johnappleseed",
  };

  return placeholders[platform?.value] || "";
};

export default getLinkPlaceholder;
