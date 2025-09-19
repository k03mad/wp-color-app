import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  previewContainer: {
    height: 200,
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  wallpaperPreview: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  previewLabel: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    fontSize: 12,
    fontWeight: '500',
    backgroundColor: 'rgba(0,0,0,0.5)',
    color: 'white',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  controlPanel: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    fontFamily: 'System',
  },
  colorInfoContainer: {
    marginTop: 8,
  },
  colorInfoText: {
    fontSize: 14,
    marginBottom: 4,
    fontFamily: 'monospace',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  colorPickerButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  colorPickerContainer: {
    marginTop: 12,
    borderRadius: 8,
    padding: 16,
  },
  generateButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  generateButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  separator: {
    height: 1,
    marginVertical: 24,
  },
  presetsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  presetSection: {
    marginBottom: 24,
  },
  presetSectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
  },
  presetColorsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    width: '100%',
  },
  presetColorBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 2,
    borderWidth: 1,
  },
  selectedPresetColor: {
    borderWidth: 3,
  },
  colorPickerButton: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
});
