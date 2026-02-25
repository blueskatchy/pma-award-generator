import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function IdleTimer({ timeout = 600000 }) {
  const navigate = useNavigate();

  useEffect(() => {
    let timer;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(logout, timeout);
    };

    const logout = () => {
      localStorage.removeItem("user");
      navigate("/login", { replace: true });
    };

    const events = ["mousemove", "mousedown", "keypress", "scroll", "touchstart"];

    events.forEach((event) =>
      window.addEventListener(event, resetTimer)
    );

    resetTimer(); // start timer

    return () => {
      clearTimeout(timer);
      events.forEach((event) =>
        window.removeEventListener(event, resetTimer)
      );
    };
  }, [navigate, timeout]);

  return null;
}