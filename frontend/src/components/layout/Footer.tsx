import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-10 border-t">
      <div className="container  flex justify-between items-center">
        <p>
          A mock website made with ☕ by{" "}
          <a
            target="_blank"
            rel="noreferrer"
            className="font-medium underline"
            href="https://github.com/firdausthedev">
            firdausthedev.
          </a>
        </p>
        <Link
          to="/"
          className="font-semibold text-2xl font-secondary text-accent">
          lodgenow
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
