"use client";

const AuthToggle = ({
  isLogin,
  toggle,
}: {
  isLogin: boolean;
  toggle: () => void;
}) => {
  return (
    <div className="mt-6 text-center">
      <button
        type="button"
        onClick={toggle}
        className="text-sm text-primary hover:underline"
      >
        {isLogin
          ? "Don't have an account? Sign up"
          : "Already have an account? Sign in"}
      </button>
    </div>
  );
};

export default AuthToggle;
