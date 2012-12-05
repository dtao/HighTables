require "haml"
require "sass"
require "yui/compressor"

SASS_FILES = %w{hightables}.map { |f| "#{f}.sass" }
JAVASCRIPT_FILES = %w{parse table linechart barchart piechart hightables}.map { |f| "#{f}.js" }

def read_src_file(filename)
  return File.read(File.join(File.dirname(__FILE__), "src", filename))
end

def write_dist_file(filename, content)
  File.open(File.join(File.dirname(__FILE__), "dist", filename), "w") do |stream|
    stream.write(content)
  end
end

namespace :build do
  desc "Build all assets"
  task :all => [:html, :css, :js]

  desc "Compile HAML to HTML"
  task :html do
    haml = read_src_file("index.haml")
    html = Haml::Engine.new(haml).render
    write_dist_file("index.html", html)
  end

  desc "Compile SASS, then concatenate and minify into a single CSS file"
  task :css do
    sass = SASS_FILES.map { |filename| read_src_file(filename) }.join("\n")
    css = Sass.compile(sass, :syntax => :sass)
    write_dist_file("hightables.min.css", YUI::CssCompressor.new.compress(css))
  end

  desc "Concatenate and minify JavaScript assets into a single file"
  task :js do
    javascript = JAVASCRIPT_FILES.map { |filename| read_src_file(filename) }.join("\n")
    write_dist_file("hightables.min.js", YUI::JavaScriptCompressor.new(:munge => true).compress(javascript))
  end
end
