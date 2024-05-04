#define PI 3.1415926535897932384626433832795

// Pseudo-random number generator
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    // random value
    float randValue = abs(random(vec2(1.0,1.0))*2.0);

    // Normalizes pixel coordinates (0.0 to 1.0)
    vec2 uv = fract(fragCoord / iResolution.xy*(cos(iTime)*3.0+3.0+randValue));

    // Transform to center coordinates
    vec2 centeredUV = 2.0 * uv - 1.0;
    centeredUV.x *= iResolution.x / iResolution.y;

    // Convert to polar coordinates
    float angle = atan(centeredUV.y, centeredUV.x);
    float radius = length(centeredUV);

    // Spiral parameters
    float spiralWidth = 0.5; // Width of the spiral lines
    float spiralSpacing = 0.5*smoothstep(-.1,0.0,sin(iTime))+.05; //*abs(sin(iTime)); // Spacing between turns of the spiral
    float spiralTurns = 1.5*abs(cos(iTime))+.1; // Number of turns in the spiral

    // Adjust angle to increase the number of turns
    angle += 2.0 * PI * spiralTurns * radius;


    // Calculate spiral
    float spiral = mod(radius + angle, spiralSpacing);

    // Determine if within the spiral path
    float inSpiral = smoothstep(spiralWidth, 0.02, spiral);

    // Calculate which arm of the spiral we are in
    int armIndex = int((radius + angle) / spiralSpacing);

    // Define a set of colors for the spiral arms
    vec3 colors[9];
    colors[0] = vec3(1.0, 0.4, 0.0); // Red
    colors[1] = vec3(0.0, 1.0, 0.0); // Green
    colors[2] = vec3(0.4, 0.0, 1.0); // Blue
    colors[3] = vec3(1.0, 1.0, 0.0); // Yellow
    colors[4] = vec3(1.0, 0.0, 1.0); // Magenta
    colors[5] = vec3(0.0, 1.0, 1.0); // Cyan
    colors[6] = vec3(1.0, 0.5, 0.0); // Orange
    colors[7] = vec3(0.0, 1.0, 0.5); // Lime
    colors[8] = vec3(0.5, 0.0, 1.0); // Purple


    // Select color based on arm index
    vec3 color = colors[armIndex % 9]; // Cycle through the three colors

    // Mix the spiral color with the background color
    color = mix(vec3(0.0), color, inSpiral);


    // Output to screen
    fragColor = vec4(color, 1.0);
}
