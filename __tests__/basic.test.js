describe("Open All Links Extension", () => {
  test("popup.js functions exist", () => {
    const fs = require("fs");
    const path = require("path");
    const popupContent = fs.readFileSync(path.resolve("popup.js"), "utf8");
    
    expect(popupContent).toContain("openAllLinks");
    expect(popupContent).toContain("addEventListener");
  });
});
