import LinkedinIcon from '@assets/icons/linkedin.svg';
import BehanceIcon from '@assets/icons/behance.svg';
import DribbbleIcon from '@assets/icons/dribbble.svg';
import GithubIcon from '@assets/icons/github.svg';
import YoutubeIcon from '@assets/icons/youtube.svg';
import type { SvgComponent } from 'astro/types';

export const ICONS: string[] = [
  'dark_mode',
  'light_mode',
  'keyboard_arrow_up',
  'keyboard_arrow_down',
  'keyboard_arrow_right',
  'keyboard_arrow_left',
  'arrow_back',
  'arrow_forward',
  'menu',
  'category',
  'design_services',
  'code_blocks',
  'send',
  'more_horiz',
  'list_alt',
  'left_panel_close',
  'top_panel_close',
  'open_in_new',
  'cloud_sync',
  'contrast',
  'passkey',
  'info',
];

export const ThemeColors = {
  brandOnyx: '#17181C',
  brandNavy: '#172C4F',
  brandAccent: '#0F4A8A',
  brandSilver: '#F7F9FC',
  statusSuccess: '#3FA242',
  statusError: '#E62719',
  statusWarning: '#F4A125',
  bgPrimary: '#F7F9FC',
  bgSecondary: '#eaedf2',
  textPrimary: '#17181C',
  textSecondary: '#172C4F',
  textMuted: '#3F4044',
  textInverse: '#F7F9FC',
  accent: '#0F4A8A',
  borderColor: '#72c4f40',
  surface0: '#F7F9FC',
  surface1: '#eaedf2',
  surface2: '#dbdfe7',
  surface3: '#cdd2db',
  surfaceInverse: '#2d4160',
  surfaceSuccess: '#e4f1e5',
  surfaceError: '#fae6e5',
  surfaceWarning: '#fcf2e4',
  actionDefault: '#0F4A8A',
  actionHover: '#0b3765',
  actionActive: '#092d53',
  actionFocus: '#f4a8a4d',
  actionDisabled: '#3f4044',
  surfaceHover: '#b37650d',
};

export const SitePublicUrl = 'https://ahmedalshair.net';

export const SiteName = 'Ahmed Alshair';
export const JobTitle = 'Product Lead, UX Expert & Front-end Developer';
export const MetaDescription =
  'Digital Product Lead with 10+ years of experience bridging the gap between product strategy and technical execution. Passionate about crafting impactful, user-centric and data-driven digital experiences.';

export type SocialLink = {
  url: string;
  label: string;
  icon: SvgComponent & ImageMetadata;
};

export const SocialLinks: { [key: string]: SocialLink } = {
  linkedin: {
    url: 'https://www.linkedin.com/in/ahmedalshair',
    label: 'LinkedIn',
    icon: LinkedinIcon,
  },
  behance: {
    url: 'https://www.behance.net/AhmedAlshair',
    label: 'Behance',
    icon: BehanceIcon,
  },
  dribbble: {
    url: 'https://dribbble.com/AhmedAlshair',
    label: 'Dribbble',
    icon: DribbbleIcon,
  },
  github: {
    url: 'https://github.com/ahmedalshair',
    label: 'Github',
    icon: GithubIcon,
  },
  youtubeUX: {
    url: 'https://youtube.com/playlist?list=PL0IMwc8ci4wU288dToUAPFYN19ucJ_Xkx&si=H4NODJGT_wrMu1Fp',
    label: 'YouTube - UX/UI',
    icon: YoutubeIcon,
  },
  youtubeMotion: {
    url: 'https://www.youtube.com/playlist?list=PL0IMwc8ci4wVxy4bl74Kt3BuoX5HJmfr-',
    label: 'YouTube - Motion',
    icon: YoutubeIcon,
  },
};

export const FormspreeId = 'xqeknyvp';
