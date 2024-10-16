import { jsx } from "react/jsx-runtime";
import { g as useTheme, u as useInViewport, b as useWindowSize, e as media, T as Transition } from "./server-build-C4nJ4DjA.js";
import { useReducedMotion, useSpring } from "framer-motion";
import { useRef, useEffect, startTransition } from "react";
import { Vector2, WebGLRenderer, LinearSRGBColorSpace, PerspectiveCamera, Scene, MeshPhongMaterial, UniformsUtils, SphereGeometry, Mesh, DirectionalLight, AmbientLight } from "three";
import { t as throttle } from "./throttle-DfCjgS7U.js";
import { c as cleanScene, a as cleanRenderer, r as removeLights } from "./three-CuK32lIV.js";
import "@remix-run/react";
import "isbot";
import "react-dom/server";
import "@remix-run/cloudflare";
import "@mdx-js/react";
import "three-stdlib";
const fragmentShader = "#define PHONG\r\n\r\nuniform vec3 diffuse;\r\nuniform vec3 emissive;\r\nuniform vec3 specular;\r\nuniform float shininess;\r\nuniform float opacity;\r\n\r\nuniform float time;\r\nvarying vec2 vUv;\r\nvarying vec3 newPosition;\r\nvarying float noise;\r\n\r\n#include <common>\r\n#include <packing>\r\n#include <dithering_pars_fragment>\r\n#include <color_pars_fragment>\r\n#include <uv_pars_fragment>\r\n#include <map_pars_fragment>\r\n#include <alphamap_pars_fragment>\r\n#include <alphatest_pars_fragment>\r\n#include <alphahash_pars_fragment>\r\n#include <aomap_pars_fragment>\r\n#include <lightmap_pars_fragment>\r\n#include <emissivemap_pars_fragment>\r\n#include <envmap_common_pars_fragment>\r\n#include <envmap_pars_fragment>\r\n#include <fog_pars_fragment>\r\n#include <bsdfs>\r\n#include <lights_pars_begin>\r\n#include <normal_pars_fragment>\r\n#include <lights_phong_pars_fragment>\r\n#include <shadowmap_pars_fragment>\r\n#include <bumpmap_pars_fragment>\r\n#include <normalmap_pars_fragment>\r\n#include <specularmap_pars_fragment>\r\n#include <logdepthbuf_pars_fragment>\r\n#include <clipping_planes_pars_fragment>\r\n\r\nvoid main() {\r\n\r\n	#include <clipping_planes_fragment>\r\n\r\n  vec3 color = vec3(vUv * (0.2 - 2.0 * noise), 1.0);\r\n  vec3 finalColors = vec3(color.b * 1.5, color.r, color.r);\r\n  vec4 diffuseColor = vec4(cos(finalColors * noise * 3.0), 1.0);\r\n  ReflectedLight reflectedLight = ReflectedLight(vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0));\r\n  vec3 totalEmissiveRadiance = emissive;\r\n\r\n	#include <logdepthbuf_fragment>\r\n	#include <map_fragment>\r\n	#include <color_fragment>\r\n	#include <alphamap_fragment>\r\n	#include <alphatest_fragment>\r\n	#include <alphahash_fragment>\r\n	#include <specularmap_fragment>\r\n	#include <normal_fragment_begin>\r\n	#include <normal_fragment_maps>\r\n	#include <emissivemap_fragment>\r\n\r\n	// accumulation\r\n	#include <lights_phong_fragment>\r\n	#include <lights_fragment_begin>\r\n	#include <lights_fragment_maps>\r\n	#include <lights_fragment_end>\r\n\r\n	// modulation\r\n	#include <aomap_fragment>\r\n\r\n	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\r\n\r\n	#include <envmap_fragment>\r\n	#include <opaque_fragment>\r\n	#include <tonemapping_fragment>\r\n	#include <colorspace_fragment>\r\n	#include <fog_fragment>\r\n	#include <premultiplied_alpha_fragment>\r\n	#include <dithering_fragment>\r\n\r\n  gl_FragColor = vec4(outgoingLight, diffuseColor.a);\r\n}\r\n";
const vertexShader = '#define PHONG\r\n\r\n//\r\n// GLSL textureless classic 3D noise "cnoise",\r\n// with an RSL-style periodic variant "pnoise".\r\n// Author:  Stefan Gustavson (stefan.gustavson@liu.se)\r\n// Version: 2011-10-11\r\n//\r\n// Many thanks to Ian McEwan of Ashima Arts for the\r\n// ideas for permutation and gradient selection.\r\n//\r\n// Copyright (c) 2011 Stefan Gustavson. All rights reserved.\r\n// Distributed under the MIT license. See LICENSE file.\r\n// https://github.com/ashima/webgl-noise\r\n//\r\nvec3 mod289(vec3 x)\r\n{\r\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\r\n}\r\n\r\nvec4 mod289(vec4 x)\r\n{\r\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\r\n}\r\n\r\nvec4 permute(vec4 x)\r\n{\r\n  return mod289(((x*34.0)+1.0)*x);\r\n}\r\n\r\nvec4 taylorInvSqrt(vec4 r)\r\n{\r\n  return 1.79284291400159 - 0.85373472095314 * r;\r\n}\r\n\r\nvec3 fade(vec3 t) {\r\n  return t*t*t*(t*(t*6.0-15.0)+10.0);\r\n}\r\n\r\n// Classic Perlin noise\r\nfloat cnoise(vec3 P)\r\n{\r\n  vec3 Pi0 = floor(P); // Integer part for indexing\r\n  vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1\r\n  Pi0 = mod289(Pi0);\r\n  Pi1 = mod289(Pi1);\r\n  vec3 Pf0 = fract(P); // Fractional part for interpolation\r\n  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0\r\n  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\r\n  vec4 iy = vec4(Pi0.yy, Pi1.yy);\r\n  vec4 iz0 = Pi0.zzzz;\r\n  vec4 iz1 = Pi1.zzzz;\r\n\r\n  vec4 ixy = permute(permute(ix) + iy);\r\n  vec4 ixy0 = permute(ixy + iz0);\r\n  vec4 ixy1 = permute(ixy + iz1);\r\n\r\n  vec4 gx0 = ixy0 * (1.0 / 7.0);\r\n  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;\r\n  gx0 = fract(gx0);\r\n  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);\r\n  vec4 sz0 = step(gz0, vec4(0.0));\r\n  gx0 -= sz0 * (step(0.0, gx0) - 0.5);\r\n  gy0 -= sz0 * (step(0.0, gy0) - 0.5);\r\n\r\n  vec4 gx1 = ixy1 * (1.0 / 7.0);\r\n  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;\r\n  gx1 = fract(gx1);\r\n  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);\r\n  vec4 sz1 = step(gz1, vec4(0.0));\r\n  gx1 -= sz1 * (step(0.0, gx1) - 0.5);\r\n  gy1 -= sz1 * (step(0.0, gy1) - 0.5);\r\n\r\n  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);\r\n  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);\r\n  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);\r\n  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);\r\n  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);\r\n  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);\r\n  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);\r\n  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);\r\n\r\n  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));\r\n  g000 *= norm0.x;\r\n  g010 *= norm0.y;\r\n  g100 *= norm0.z;\r\n  g110 *= norm0.w;\r\n  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));\r\n  g001 *= norm1.x;\r\n  g011 *= norm1.y;\r\n  g101 *= norm1.z;\r\n  g111 *= norm1.w;\r\n\r\n  float n000 = dot(g000, Pf0);\r\n  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));\r\n  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));\r\n  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));\r\n  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));\r\n  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));\r\n  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));\r\n  float n111 = dot(g111, Pf1);\r\n\r\n  vec3 fade_xyz = fade(Pf0);\r\n  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);\r\n  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);\r\n  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);\r\n  return 2.2 * n_xyz;\r\n}\r\n\r\n// Classic Perlin noise, periodic variant\r\nfloat pnoise(vec3 P, vec3 rep)\r\n{\r\n  vec3 Pi0 = mod(floor(P), rep); // Integer part, modulo period\r\n  vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); // Integer part + 1, mod period\r\n  Pi0 = mod289(Pi0);\r\n  Pi1 = mod289(Pi1);\r\n  vec3 Pf0 = fract(P); // Fractional part for interpolation\r\n  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0\r\n  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\r\n  vec4 iy = vec4(Pi0.yy, Pi1.yy);\r\n  vec4 iz0 = Pi0.zzzz;\r\n  vec4 iz1 = Pi1.zzzz;\r\n\r\n  vec4 ixy = permute(permute(ix) + iy);\r\n  vec4 ixy0 = permute(ixy + iz0);\r\n  vec4 ixy1 = permute(ixy + iz1);\r\n\r\n  vec4 gx0 = ixy0 * (1.0 / 7.0);\r\n  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;\r\n  gx0 = fract(gx0);\r\n  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);\r\n  vec4 sz0 = step(gz0, vec4(0.0));\r\n  gx0 -= sz0 * (step(0.0, gx0) - 0.5);\r\n  gy0 -= sz0 * (step(0.0, gy0) - 0.5);\r\n\r\n  vec4 gx1 = ixy1 * (1.0 / 7.0);\r\n  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;\r\n  gx1 = fract(gx1);\r\n  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);\r\n  vec4 sz1 = step(gz1, vec4(0.0));\r\n  gx1 -= sz1 * (step(0.0, gx1) - 0.5);\r\n  gy1 -= sz1 * (step(0.0, gy1) - 0.5);\r\n\r\n  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);\r\n  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);\r\n  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);\r\n  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);\r\n  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);\r\n  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);\r\n  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);\r\n  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);\r\n\r\n  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));\r\n  g000 *= norm0.x;\r\n  g010 *= norm0.y;\r\n  g100 *= norm0.z;\r\n  g110 *= norm0.w;\r\n  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));\r\n  g001 *= norm1.x;\r\n  g011 *= norm1.y;\r\n  g101 *= norm1.z;\r\n  g111 *= norm1.w;\r\n\r\n  float n000 = dot(g000, Pf0);\r\n  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));\r\n  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));\r\n  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));\r\n  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));\r\n  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));\r\n  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));\r\n  float n111 = dot(g111, Pf1);\r\n\r\n  vec3 fade_xyz = fade(Pf0);\r\n  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);\r\n  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);\r\n  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);\r\n  return 2.2 * n_xyz;\r\n}\r\n\r\nfloat turbulence(vec3 p) {\r\n  float w = 100.0;\r\n  float t = -.5;\r\n  for (float f = 1.0 ; f <= 10.0 ; f++) {\r\n    float power = pow(2.0, f);\r\n    t += abs(pnoise(vec3(power * p), vec3(10.0, 10.0, 10.0)) / power);\r\n  }\r\n  return t;\r\n}\r\n\r\n// START\r\nuniform float time;\r\nvarying vec2 vUv;\r\nvarying float noise;\r\n\r\nvarying vec3 vViewPosition;\r\n\r\n#include <common>\r\n#include <batching_pars_vertex>\r\n#include <uv_pars_vertex>\r\n#include <displacementmap_pars_vertex>\r\n#include <envmap_pars_vertex>\r\n#include <color_pars_vertex>\r\n#include <fog_pars_vertex>\r\n#include <normal_pars_vertex>\r\n#include <morphtarget_pars_vertex>\r\n#include <skinning_pars_vertex>\r\n#include <shadowmap_pars_vertex>\r\n#include <logdepthbuf_pars_vertex>\r\n#include <clipping_planes_pars_vertex>\r\n\r\nvoid main() {\r\n\r\n	#include <uv_vertex>\r\n	#include <color_vertex>\r\n	#include <morphcolor_vertex>\r\n	#include <batching_vertex>\r\n\r\n	#include <beginnormal_vertex>\r\n	#include <morphnormal_vertex>\r\n	#include <skinbase_vertex>\r\n	#include <skinnormal_vertex>\r\n	#include <defaultnormal_vertex>\r\n	#include <normal_vertex>\r\n\r\n	#include <begin_vertex>\r\n	#include <morphtarget_vertex>\r\n	#include <skinning_vertex>\r\n	#include <displacementmap_vertex>\r\n	#include <project_vertex>\r\n	#include <logdepthbuf_vertex>\r\n	#include <clipping_planes_vertex>\r\n\r\n	vViewPosition = - mvPosition.xyz;\r\n\r\n	#include <worldpos_vertex>\r\n	#include <envmap_vertex>\r\n	#include <shadowmap_vertex>\r\n	#include <fog_vertex>\r\n\r\n  vUv = uv;\r\n\r\n  noise = turbulence(0.01 * position + normal + time * 0.8);\r\n  vec3 displacement = vec3((position.x) * noise, position.y * noise, position.z * noise);\r\n  gl_Position = projectionMatrix * modelViewMatrix * vec4((position + normal) + displacement, 1.0);\r\n}\r\n';
const canvas = "_canvas_1pqfq_1";
const styles = {
  canvas
};
const springConfig = {
  stiffness: 30,
  damping: 20,
  mass: 2
};
const DisplacementSphere = (props) => {
  const { theme } = useTheme();
  const start = useRef(Date.now());
  const canvasRef = useRef();
  const mouse = useRef();
  const renderer = useRef();
  const camera = useRef();
  const scene = useRef();
  const lights = useRef();
  const uniforms = useRef();
  const material = useRef();
  const geometry = useRef();
  const sphere = useRef();
  const reduceMotion = useReducedMotion();
  const isInViewport = useInViewport(canvasRef);
  const windowSize = useWindowSize();
  const rotationX = useSpring(0, springConfig);
  const rotationY = useSpring(0, springConfig);
  useEffect(() => {
    const { innerWidth, innerHeight } = window;
    mouse.current = new Vector2(0.8, 0.5);
    renderer.current = new WebGLRenderer({
      canvas: canvasRef.current,
      antialias: false,
      alpha: true,
      powerPreference: "high-performance",
      failIfMajorPerformanceCaveat: true
    });
    renderer.current.setSize(innerWidth, innerHeight);
    renderer.current.setPixelRatio(1);
    renderer.current.outputColorSpace = LinearSRGBColorSpace;
    camera.current = new PerspectiveCamera(54, innerWidth / innerHeight, 0.1, 100);
    camera.current.position.z = 52;
    scene.current = new Scene();
    material.current = new MeshPhongMaterial();
    material.current.onBeforeCompile = (shader) => {
      uniforms.current = UniformsUtils.merge([
        shader.uniforms,
        { time: { type: "f", value: 0 } }
      ]);
      shader.uniforms = uniforms.current;
      shader.vertexShader = vertexShader;
      shader.fragmentShader = fragmentShader;
    };
    startTransition(() => {
      geometry.current = new SphereGeometry(32, 128, 128);
      sphere.current = new Mesh(geometry.current, material.current);
      sphere.current.position.z = 0;
      sphere.current.modifier = Math.random();
      scene.current.add(sphere.current);
    });
    return () => {
      cleanScene(scene.current);
      cleanRenderer(renderer.current);
    };
  }, []);
  useEffect(() => {
    const dirLight = new DirectionalLight(16777215, theme === "light" ? 1.8 : 2);
    const ambientLight = new AmbientLight(16777215, theme === "light" ? 2.7 : 0.4);
    dirLight.position.z = 200;
    dirLight.position.x = 100;
    dirLight.position.y = 100;
    lights.current = [dirLight, ambientLight];
    lights.current.forEach((light) => scene.current.add(light));
    return () => {
      removeLights(lights.current);
    };
  }, [theme]);
  useEffect(() => {
    const { width, height } = windowSize;
    const adjustedHeight = height + height * 0.3;
    renderer.current.setSize(width, adjustedHeight);
    camera.current.aspect = width / adjustedHeight;
    camera.current.updateProjectionMatrix();
    if (reduceMotion) {
      renderer.current.render(scene.current, camera.current);
    }
    if (width <= media.mobile) {
      sphere.current.position.x = 14;
      sphere.current.position.y = 10;
    } else if (width <= media.tablet) {
      sphere.current.position.x = 18;
      sphere.current.position.y = 14;
    } else {
      sphere.current.position.x = 22;
      sphere.current.position.y = 16;
    }
  }, [reduceMotion, windowSize]);
  useEffect(() => {
    const onMouseMove = throttle((event) => {
      const position = {
        x: event.clientX / window.innerWidth,
        y: event.clientY / window.innerHeight
      };
      rotationX.set(position.y / 2);
      rotationY.set(position.x / 2);
    }, 100);
    if (!reduceMotion && isInViewport) {
      window.addEventListener("mousemove", onMouseMove);
    }
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [isInViewport, reduceMotion, rotationX, rotationY]);
  useEffect(() => {
    let animation;
    const animate = () => {
      animation = requestAnimationFrame(animate);
      if (uniforms.current !== void 0) {
        uniforms.current.time.value = 5e-5 * (Date.now() - start.current);
      }
      sphere.current.rotation.z += 1e-3;
      sphere.current.rotation.x = rotationX.get();
      sphere.current.rotation.y = rotationY.get();
      renderer.current.render(scene.current, camera.current);
    };
    if (!reduceMotion && isInViewport) {
      animate();
    } else {
      renderer.current.render(scene.current, camera.current);
    }
    return () => {
      cancelAnimationFrame(animation);
    };
  }, [isInViewport, reduceMotion, rotationX, rotationY]);
  return /* @__PURE__ */ jsx(Transition, { in: true, timeout: 3e3, nodeRef: canvasRef, children: ({ visible, nodeRef }) => /* @__PURE__ */ jsx(
    "canvas",
    {
      "aria-hidden": true,
      className: styles.canvas,
      "data-visible": visible,
      ref: nodeRef,
      ...props
    }
  ) });
};
export {
  DisplacementSphere
};
