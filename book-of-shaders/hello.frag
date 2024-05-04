#ifdef GL_ES
precision mediump float;
#endif

// use glslViewer to run this shader

uniform float u_time;
uniform vec2 u_resolution;
// below are defined by the ShaderToy extension
// uniform vec3 iResolution;  // viewport resolution (in pixels)
// uniform vec4 iMouse;        // mouse pixel coords. xy: current, zw: click
// uniform float iTime;        // shader playback time (in seconds)

vec4 red(){
    return vec4(1.0,0.0,0.0,1.0);
}

void main() {
	// gl_FragColor = vec4(.1,0.5,0.5,0.01);
	// gl_FragColor = red();
	// gl_FragColor = vec4(abs(sin(iTime)),0.0,0.0,1.0); // blink
	
	// color based on time
	// vec2 st = gl_FragCoord.xy/iResolution.xy;
	// st.x = st.x + sin(iTime);
	// st.y = st.y + cos(iTime);
	// gl_FragColor = vec4(st.x,st.y,st.x,1.0); // blend

	// color based on mouse position
	// vec2 mouse = iMouse.xy/iResolution.xy;
	// gl_FragColor = vec4(mouse.x,mouse.y,0.0,1.0);

	vec2 st = gl_FragCoord.xy/u_resolution;
	st.x = sin(st.x+sin(u_time));

	gl_FragColor = vec4(0.0,0.1,st.x,1.0);
	
}