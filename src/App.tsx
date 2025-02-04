import { useState } from "react";

function App() {
  const getRandomColor = () => {
    return Math.floor(Math.random() * 16777215).toString(16);
  };

  const [avatarConfig, setAvatarConfig] = useState({
    name: "",
    size: 300,
    fontSize: 0.5,
    length: 2,
    bgColor: getRandomColor(),
    fontColor: "ffffff",
    rounded: true,
    bold: true,
    uppercase: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setAvatarConfig((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    avatarConfig.uppercase ? avatarConfig.name.toUpperCase() : avatarConfig.name
  )}&background=${avatarConfig.bgColor}&color=${avatarConfig.fontColor}&size=${
    avatarConfig.size
  }&bold=${avatarConfig.bold ? "true" : "false"}&rounded=${
    avatarConfig.rounded ? "true" : "false"
  }&length=${avatarConfig.length}&font-size=${avatarConfig.fontSize}`;

  const downloadAvatar = async () => {
    if (!avatarConfig.name) return;
    try {
      const response = await fetch(avatarUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `${avatarConfig.name}-avatar.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error downloading avatar:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-5">
      <h1 className="text-5xl font-bold mb-10 ">Profile Generator</h1>

      <div
        className={`${
          avatarConfig.name && avatarUrl
            ? "grid-cols-2 max-w-5xl"
            : "grid-cols-1 max-w-xl"
        }  gap-5 items-center  w-full grid`}
      >
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full">
          <label className="block mb-2">
            Name (Required)
            <input
              type="text"
              name="name"
              value={avatarConfig.name}
              onChange={handleChange}
              className="w-full p-2 mt-1 bg-gray-700 border border-gray-600 rounded"
              placeholder="Enter your name"
            />
          </label>

          <label className="block mt-3">
            Image Size
            <input
              type="number"
              name="size"
              value={avatarConfig.size}
              onChange={handleChange}
              className="w-full p-2 mt-1 bg-gray-700 border border-gray-600 rounded"
            />
          </label>

          <label className="block mt-3">
            Font Size (0.1 - 1)
            <input
              type="number"
              step="0.1"
              min="0.1"
              max="1"
              name="fontSize"
              value={avatarConfig.fontSize}
              onChange={handleChange}
              className="w-full p-2 mt-1 bg-gray-700 border border-gray-600 rounded"
            />
          </label>

          <label className="block mt-3">
            Initial Characters (1-3)
            <input
              type="number"
              name="length"
              min="1"
              max="3"
              value={avatarConfig.length}
              onChange={handleChange}
              className="w-full p-2 mt-1 bg-gray-700 border border-gray-600 rounded"
            />
          </label>

          {/* Background Color */}
          <label className="block mt-3">
            Background Color
            <input
              type="color"
              name="bgColor"
              value={`#${avatarConfig.bgColor}`}
              onChange={(e) =>
                setAvatarConfig((prev) => ({
                  ...prev,
                  bgColor: e.target.value.substring(1),
                }))
              }
              className="w-full mt-1 cursor-pointer"
            />
          </label>

          {/* Randomize Background Color Button */}
          <button
            onClick={() =>
              setAvatarConfig((prev) => ({
                ...prev,
                bgColor: getRandomColor(),
              }))
            }
            className="mt-3 bg-gradient-to-r from-indigo-500 font-semibold via-purple-500 to-pink-500 px-4 w-full py-2 rounded text-white"
          >
            Randomize Background Color
          </button>

          {/* Font Color */}
          <label className="block mt-3">
            Font Color
            <input
              type="color"
              name="fontColor"
              value={`#${avatarConfig.fontColor}`}
              onChange={(e) =>
                setAvatarConfig((prev) => ({
                  ...prev,
                  fontColor: e.target.value.substring(1),
                }))
              }
              className="w-full mt-1 cursor-pointer"
            />
          </label>

          <div className="flex items-center justify-between mt-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="rounded"
                checked={avatarConfig.rounded}
                onChange={handleChange}
                className="mr-2"
              />
              Rounded Image
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                name="bold"
                checked={avatarConfig.bold}
                onChange={handleChange}
                className="mr-2"
              />
              Bold
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                name="uppercase"
                checked={avatarConfig.uppercase}
                onChange={handleChange}
                className="mr-2"
              />
              Uppercase
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-5 items-center">
          {avatarConfig.name && (
            <div className="mt-5 text-center">
              <img
                src={avatarUrl}
                alt="Avatar Preview"
                className="mx-auto border border-gray-700"
                style={{
                  borderRadius: avatarConfig.rounded ? "50%" : "0",
                  width: avatarConfig.size,
                  height: avatarConfig.size,
                }}
              />
            </div>
          )}

          <button
            type="button"
            onClick={downloadAvatar}
            className={`${
              avatarConfig.name && avatarUrl ? "flex" : "hidden"
            } button-color mx-auto text-white py-3 px-5 rounded-full cursor-pointer`}
            disabled={!avatarConfig.name}
          >
            Download Avatar
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
