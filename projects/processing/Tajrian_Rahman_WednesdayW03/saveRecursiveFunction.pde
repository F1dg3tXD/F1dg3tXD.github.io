// Made by Tajrian Rahman

int saveNum = 0;

void recSave(String customFileName, String fileExtension) {
  save(customFileName + "_" + saveNum + fileExtension);
  saveNum++;
}
