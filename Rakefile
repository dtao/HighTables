require "yaml"
require "haml"
require "sass"
require "nokogiri"
require "redcarpet"
require "pygments"
require "yui/compressor"

CSS_FILES        = %w{pygments}.map { |f| "#{f}.css" }
SASS_FILES       = %w{hightables}.map { |f| "#{f}.sass" }
JAVASCRIPT_FILES = %w{init parse table linechart barchart piechart}.map { |f| "#{f}.js" }
SECTIONS         = YAML.load_file(File.join(File.dirname(__FILE__), "doc", "sections.yml"))

def read_file(dir, filename)
  File.read(File.join(File.dirname(__FILE__), dir, filename))
end

def write_file(*args)
  filename, content = args[-2, 2]
  dirs = args.take(args.length - 2)
  File.open(File.join(File.dirname(__FILE__), *dirs, filename), "w") do |stream|
    stream.write(content)
  end
end

def renderer
  @renderer ||= Redcarpet::Markdown.new(Redcarpet::Render::HTML, :fenced_code_blocks => true)
end

def render_content(section_id)
  markdown = read_file("doc", "#{section_id}.md")
  renderer.render(markdown)  
end

def example_exists?(section_id)
  return File.exist?(File.join(File.dirname(__FILE__), "doc", "#{section_id}.haml"))
end

def render_example(section_id)
  if example_exists?(section_id)
    haml = read_file("doc", "#{section_id}.haml")
    return Haml::Engine.new(haml).render
  end

  ""
end

namespace :build do
  desc "Build all assets"
  task :all => [:readme, :html, :css, :js]

  desc "Compile README file from docs (without examples)"
  task :readme do
    docs = read_file("doc", "intro.md") + "\n" +
      SECTIONS.map { |section| read_file("doc", "#{section['id']}.md") }.join("\n")
    write_file("README.md", docs)
  end

  desc "Compile HAML to HTML"
  task :html do
    haml = read_file("src", "index.haml")
    html = Haml::Engine.new(haml).render(self, :sections => SECTIONS)
    hdoc = Nokogiri::HTML.parse(html)
    hdoc.css("pre").each do |node|
      lang = node.css("code").attr("class")
      node.inner_html = Pygments.highlight(node.content, :lexer => lang)
    end
    write_file("dist", "index.html", hdoc.to_html)
  end

  desc "Compile SASS, then concatenate and minify into a single CSS file"
  task :css do
    sass = SASS_FILES.map { |filename| read_file("src", filename) }.join("\n")
    css = [
      Sass.compile(sass, :syntax => :sass),
      CSS_FILES.map { |filename| read_file("src", filename) }.join("\n")
    ].join("\n")
    write_file("dist", "hightables.css", css)
    write_file("dist", "hightables.min.css", YUI::CssCompressor.new.compress(css))
  end

  desc "Concatenate and minify JavaScript assets into a single file"
  task :js do
    javascript = JAVASCRIPT_FILES.map { |filename| read_file("src", filename) }.join("\n")
    write_file("dist", "hightables.js", javascript)
    write_file("dist", "hightables.min.js", YUI::JavaScriptCompressor.new(:munge => true).compress(javascript))
  end
end
