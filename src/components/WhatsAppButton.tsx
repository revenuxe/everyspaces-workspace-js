const WhatsAppButton = () => {
  const phoneNumber = "919886285028";
  const message = encodeURIComponent("Hi, I'm looking for office space. Can you help me find the right workspace?");
  const url = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[hsl(142,70%,45%)] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      aria-label="Chat on WhatsApp"
    >
      <svg viewBox="0 0 20 20" className="w-7 h-7" fill="white">
        <path d="M15.821,13.12124 C15.58,13.80344 14.622,14.36761 13.858,14.53266 C13.335,14.64369 12.653,14.73172 10.355,13.77943 C7.774,12.71011 4.19,8.90097 4.19,6.36621 C4.19,5.07582 4.934,3.57337 6.235,3.57337 C6.861,3.57337 6.999,3.58538 7.205,4.07952 C7.446,4.6617 8.034,6.09613 8.104,6.24317 C8.393,6.84635 7.81,7.19946 7.387,7.72462 C7.252,7.88266 7.099,8.05372 7.27,8.3478 C7.44,8.63589 8.028,9.59418 8.892,10.36341 C10.008,11.35771 10.913,11.6748 11.237,11.80984 C11.478,11.90987 11.766,11.88687 11.942,11.69881 C12.165,11.45774 12.442,11.05762 12.724,10.6635 C12.923,10.38141 13.176,10.3464 13.441,10.44643 C13.62,10.50845 15.895,11.56477 15.991,11.73382 C16.062,11.85686 16.062,12.43903 15.821,13.12124 M10.002,-1 L9.997,-1 L9.997,-1 C4.484,-1 0,3.48535 0,9 C0,11.18666 0.705,13.21526 1.904,14.86076 L0.658,18.57687 L4.501,17.3485 C6.082,18.39482 7.969,19 10.002,19 C15.515,19 20,14.51465 20,9 C20,3.48535 15.515,-1 10.002,-1" transform="translate(0, 1)" />
      </svg>
    </a>
  );
};

export default WhatsAppButton;
