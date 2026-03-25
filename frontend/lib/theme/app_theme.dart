import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppColors {
  // Backgrounds - three levels of depth
  static const bg = Color(0xFF06060F); // darkest - main scaffold
  static const bg2 = Color(0xFF0C0C1E); // mid - cards, sections
  static const bg3 = Color(0xFF12123A); // lightest dark - thumbnails

  // "glass" layering effect
  static const surface = Color(0x0AFFFFFF); // 4% white overlay
  static const border = Color(0x14FFFFFF); // 8% white — subtle borders

  // Accent palette
  static const accent = Color(0xFFE040FB); // magenta - primary highlight
  static const accent2 = Color(0xFF7C4DFF); // violet - secondary
  static const accent3 = Color(0xFF00E5FF); // cyan - mono/code elements
  static const accent4 = Color(0xFFFF4081); // pink-red - danger/delete

  // Text hierarchy - three levels of emphasis
  static const text = Color(0xFFF0F0FF); // near white - main content
  static const text2 = Color(0xFF9090B8); // muted - descriptions
  static const text3 = Color(0xFF5050A0); // dim - hints, labels

  static const accentGradient = LinearGradient(
    colors: [accent, accent2, accent3],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );
}

class AppTextStyles {
  static TextStyle display({double size = 64, Color color = AppColors.text}) =>
      GoogleFonts.syne(
        fontSize: size,
        fontWeight: FontWeight.w800,
        color: color,
        height: 0.95,
        letterSpacing: -2,
      );

  static TextStyle heading({double size = 36, Color color = AppColors.text}) =>
      GoogleFonts.syne(
        fontSize: size,
        fontWeight: FontWeight.w700,
        color: color,
        height: 1.1,
      );

  static TextStyle body({double size = 15, Color color = AppColors.text2}) =>
      GoogleFonts.syne(
        fontSize: size,
        fontWeight: FontWeight.w400,
        color: color,
        height: 1.8,
      );

  static TextStyle mono({double size = 12, Color color = AppColors.text2}) =>
      GoogleFonts.jetBrainsMono(
        fontSize: size,
        fontWeight: FontWeight.w400,
        color: color,
        letterSpacing: 1.5,
      );

  static TextStyle zen({double size = 16, Color color = AppColors.accent}) =>
      GoogleFonts.zenDots(fontSize: size, color: color, letterSpacing: 2);
}

// for responsive design - can be used in any widget to adapt to screen size
class Responsive {
  static bool isMobile(BuildContext context) =>
      MediaQuery.of(context).size.width < 600;

  static bool isTablet(BuildContext context) =>
      MediaQuery.of(context).size.width < 900;

  static bool isDesktop(BuildContext context) =>
      MediaQuery.of(context).size.width >= 900;

  // Returns a value based on screen size — use this for
  // font sizes, padding, column counts, anything that scales
  static T value<T>(
    BuildContext context, {
    required T mobile,
    T? tablet,
    required T desktop,
  }) {
    if (isMobile(context)) return mobile;
    if (isTablet(context)) return tablet ?? desktop;
    return desktop;
  }
}

class AppTheme {
  static ThemeData get dark => ThemeData(
    brightness: Brightness.dark,
    scaffoldBackgroundColor: AppColors.bg,
    colorScheme: const ColorScheme.dark(
      primary: AppColors.accent,
      secondary: AppColors.accent2,
      surface: AppColors.bg2,
    ),
    textTheme: GoogleFonts.syneTextTheme(ThemeData.dark().textTheme),
    useMaterial3: true,
  );
}
