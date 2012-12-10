require "haml"
require "sass"
require "nokogiri"
require "pygments"
require "yui/compressor"

CSS_FILES = %w{pygments}.map { |f| "#{f}.css" }
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
    hdoc = Nokogiri::HTML.parse(html)
    hdoc.css("pre").each do |node|
      lang = node.attr("class")
      node.inner_html = Pygments.highlight(node.content, :lexer => lang)
    end
    write_dist_file("index.html", hdoc.to_html)
  end

  desc "Compile SASS, then concatenate and minify into a single CSS file"
  task :css do
    sass = SASS_FILES.map { |filename| read_src_file(filename) }.join("\n")
    css = [
      Sass.compile(sass, :syntax => :sass),
      CSS_FILES.map { |filename| read_src_file(filename) }.join("\n")
    ].join("\n")
    write_dist_file("hightables.min.css", YUI::CssCompressor.new.compress(css))
  end

  desc "Concatenate and minify JavaScript assets into a single file"
  task :js do
    javascript = "window.HighTables = {};\n\n" +
      JAVASCRIPT_FILES.map { |filename| read_src_file(filename) }.join("\n")
    write_dist_file("hightables.js", javascript)
    write_dist_file("hightables.min.js", YUI::JavaScriptCompressor.new(:munge => true).compress(javascript))
  end
end
