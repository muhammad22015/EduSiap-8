import React from 'react';

interface SocialButtonProps {
  icon: 'google' | 'apple';
  text: string;
}

const SocialButton: React.FC<SocialButtonProps> = ({ icon, text }) => {
  const iconSvg = icon === 'google' ? (
    <svg id="145:549" layer-name="icons8-google 1" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="google-icon" style={{ width: '24px', height: '24px' }}>
      <path d="M21.8055 10.2953H21V10.2538H12V14.2538H17.6515C16.827 16.5823 14.6115 18.2538 12 18.2538C8.6865 18.2538 6 15.5673 6 12.2538C6 8.94028 8.6865 6.25378 12 6.25378C13.5295 6.25378 14.921 6.83078 15.9805 7.77328L18.809 4.94478C17.023 3.28028 14.634 2.25378 12 2.25378C6.4775 2.25378 2 6.73128 2 12.2538C2 17.7763 6.4775 22.2538 12 22.2538C17.5225 22.2538 22 17.7763 22 12.2538C22 11.5833 21.931 10.9288 21.8055 10.2953Z" fill="#FFC107"></path>
      <path d="M3.15302 7.59928L6.43851 10.0088C7.32752 7.80778 9.48052 6.25378 12 6.25378C13.5295 6.25378 14.921 6.83078 15.9805 7.77328L18.809 4.94478C17.023 3.28028 14.634 2.25378 12 2.25378C8.15902 2.25378 4.82802 4.42228 3.15302 7.59928Z" fill="#FF3D00"></path>
      <path d="M12 22.2538C14.583 22.2538 16.93 21.2653 18.7045 19.6578L15.6095 17.0388C14.6055 17.7993 13.3575 18.2538 12 18.2538C9.39897 18.2538 7.19047 16.5953 6.35847 14.2808L3.09747 16.7933C4.75247 20.0318 8.11347 22.2538 12 22.2538Z" fill="#4CAF50"></path>
      <path d="M21.8055 10.2953H21V10.2538H12V14.2538H17.6515C17.2555 15.3723 16.536 16.3368 15.608 17.0393L15.6095 17.0383L18.7045 19.6573C18.4855 19.8563 22 17.2538 22 12.2538C22 11.5833 21.931 10.9288 21.8055 10.2953Z" fill="#1976D2"></path>
    </svg>
  ) : (
    <svg id="145:557" layer-name="icons8-apple-logo 1" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="apple-icon" style={{ width: '24px', height: '24px' }}>
      <g clipPath="url(#clip0_145_557)">
        <path d="M17.4862 0.253808C16.125 0.345683 14.6681 1.15568 13.7662 2.24881C12.9768 3.21068 12.315 4.62256 12.5662 6.08881C12.3412 6.01943 12.1368 6.01193 11.8912 5.92381C11.2218 5.68568 10.4568 5.42881 9.50622 5.42881C7.6181 5.42881 5.68497 6.55193 4.46622 8.42881C2.69247 11.1551 3.04872 15.9532 5.74122 20.0538C6.2156 20.7738 6.76872 21.5594 7.45122 22.1838C8.13372 22.8082 8.95872 23.2844 9.92622 23.2938C10.7531 23.3032 11.3287 23.0276 11.8462 22.7988C12.3637 22.5701 12.8456 22.3676 13.7512 22.3638C13.7568 22.3638 13.7606 22.3638 13.7662 22.3638C14.6681 22.3563 15.135 22.5551 15.6412 22.7838C16.1475 23.0126 16.7175 23.3013 17.5462 23.2938C18.5325 23.2863 19.3706 22.7463 20.0662 22.0788C20.7618 21.4113 21.3337 20.5919 21.8062 19.8738C22.4831 18.8426 22.755 18.2801 23.2762 17.1288C23.3306 17.0088 23.3325 16.8701 23.28 16.7482C23.2293 16.6263 23.13 16.5307 23.0062 16.4838C21.3 15.8388 20.3268 14.3294 20.1862 12.7338C20.0456 11.1382 20.7206 9.49568 22.4212 8.56381C22.5468 8.49631 22.635 8.37818 22.665 8.23943C22.6931 8.10068 22.6593 7.95443 22.5712 7.84381C21.3506 6.32693 19.6331 5.42881 17.9512 5.42881C16.8787 5.42881 16.0912 5.68193 15.4462 5.92381C15.3393 5.96506 15.2606 5.96131 15.1612 5.99881C15.8156 5.65381 16.3931 5.17568 16.8262 4.61881C17.6137 3.60818 18.2212 2.17006 17.9962 0.658808C17.9587 0.411308 17.7356 0.235058 17.4862 0.253808ZM16.9762 1.39381C16.9443 2.36318 16.6125 3.31193 16.0612 4.01881C15.4837 4.76131 14.5125 5.27506 13.5712 5.42881C13.5881 4.49693 13.9556 3.53131 14.5162 2.84881C15.105 2.13631 16.08 1.62256 16.9762 1.39381ZM9.50622 6.38881C9.92622 6.38881 10.9012 6.58943 11.5612 6.82381C12.2212 7.05818 12.9168 7.33381 13.7362 7.33381C14.5368 7.33381 15.1706 7.05631 15.7912 6.82381C16.4118 6.59131 17.0306 6.38881 17.9512 6.38881C19.1531 6.38881 20.4525 7.01318 21.4762 8.09881C19.8375 9.25568 19.0706 11.0594 19.2262 12.8088C19.3818 14.5769 20.4468 16.2551 22.1962 17.1288C22.1937 17.1343 22.1912 17.1397 22.1887 17.1451C21.8142 17.961 21.5644 18.5051 21.0112 19.3488C20.5518 20.0482 20.0062 20.8132 19.4062 21.3888C18.8062 21.9644 18.1706 22.3282 17.5312 22.3338C16.9143 22.3394 16.5637 22.1557 16.0312 21.9138C15.4987 21.6719 14.8106 21.3944 13.7512 21.4038C12.6937 21.4094 11.9962 21.6757 11.4562 21.9138C10.9162 22.1519 10.5618 22.3394 9.94122 22.3338C9.28497 22.3282 8.6756 22.0094 8.09622 21.4788C7.51685 20.9482 6.99372 20.2244 6.53622 19.5288C4.01622 15.6888 3.81372 11.1776 5.26122 8.95381C6.32247 7.32068 9.08622 6.38881 9.50622 6.38881Z" fill="black"></path>
        Continuing from where we left off:

        <path d="M9.50622 6.38881C9.92622 6.38881 10.9012 6.58943 11.5612 6.82381C12.2212 7.05818 12.9168 7.33381 13.7362 7.33381C14.5368 7.33381 15.1706 7.05631 15.7912 6.82381C16.4118 6.59131 17.0306 6.38881 17.9512 6.38881C19.1531 6.38881 20.4525 7.01318 21.4762 8.09881C19.8375 9.25568 19.0706 11.0594 19.2262 12.8088C19.3818 14.5769 20.4468 16.2551 22.1962 17.1288L22.1887 17.1451C21.8142 17.961 21.5644 18.5051 21.0112 19.3488C20.5518 20.0482 20.0062 20.8132 19.4062 21.3888C18.8062 21.9644 18.1706 22.3282 17.5312 22.3338C16.9143 22.3394 16.5637 22.1557 16.0312 21.9138C15.4987 21.6719 14.8106 21.3944 13.7512 21.4038C12.6937 21.4094 11.9962 21.6757 11.4562 21.9138C10.9162 22.1519 10.5618 22.3394 9.94122 22.3338C9.28497 22.3282 8.6756 22.0094 8.09622 21.4788C7.51685 20.9482 6.99372 20.2244 6.53622 19.5288C4.01622 15.6888 3.81372 11.1776 5.26122 8.95381C6.32247 7.32068 9.08622 6.38881 9.50622 6.38881Z" fill="black"></path>
        <path d="M16.9762 1.39381C16.9443 2.36318 16.6125 3.31193 16.0612 4.01881C15.4837 4.76131 14.5125 5.27506 13.5712 5.42881C13.5881 4.49693 13.9556 3.53131 14.5162 2.84881C15.105 2.13631 16.08 1.62256 16.9762 1.39381Z" fill="black"></path>
      </g>
      <defs>
        <clipPath id="clip0_145_557">
          <rect width="24" height="24" fill="white" transform="translate(0 0.253784)"></rect>
        </clipPath>
      </defs>
    </svg>
  );

  return (
    <button className="flex gap-2.5 items-center px-5 py-1 text-xs text-black rounded-xl border border-solid cursor-pointer border-zinc-300 max-sm:justify-center">
      <span aria-hidden="true">{iconSvg}</span>
      <span>{text}</span>
    </button>
  );
};

export default SocialButton;