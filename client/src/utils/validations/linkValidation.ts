import { Platform } from "../../types/link";

const getLinkValidation = (platform: Platform): RegExp | "" => {
  const urlPatterns = {
    github: /^https:\/\/(www\.)?github\.com\/[a-zA-Z0-9_-]+$/,
    frontendmentor:
      /^https:\/\/(www\.)?frontendmentor\.io\/profile\/[a-zA-Z0-9_-]+$/,
    twitter: /^https:\/\/(www\.)?twitter\.com\/[a-zA-Z0-9_-]+$/,
    linkedin: /^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+$/,
    youtube: /^https:\/\/(www\.)?youtube\.com\/user\/[a-zA-Z0-9_-]+$/,
    facebook: /^https:\/\/(www\.)?facebook\.com\/[a-zA-Z0-9_-]+$/,
    twitch: /^https:\/\/(www\.)?twitch\.tv\/[a-zA-Z0-9_-]+$/,
    codewars: /^https:\/\/(www\.)?codewars\.com\/users\/[a-zA-Z0-9_-]+$/,
    freecodecamp: /^https:\/\/(www\.)?freecodecamp\.org\/[a-zA-Z0-9_-]+$/,
    gitlab: /^https:\/\/(www\.)?gitlab\.com\/[a-zA-Z0-9_-]+$/,
    hashnode: /^https:\/\/(www\.)?hashnode\.com\/@[a-zA-Z0-9_-]+$/,
    stackoverflow:
      /^https:\/\/(www\.)?stackoverflow\.com\/users\/\d+\/[a-zA-Z0-9_-]+$/,
  };

  if (platform.value in urlPatterns) {
    return urlPatterns[platform.value as keyof typeof urlPatterns];
  }

  return "";
};

export default getLinkValidation;
